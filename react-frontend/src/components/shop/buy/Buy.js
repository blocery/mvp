import TokenGethSC from '../../../contracts/TokenGethSC';
import React, {Fragment, Component } from 'react'
import { Container, InputGroup, InputGroupAddon, InputGroupText, Input, Form, Row, Col, FormGroup, Label, Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom'
import { getGoods, getGoodsByGoodsNo, updateGoodsRemained } from '../../../lib/goodsApi'
import { Server } from '../../Properties'
import ComUtil from '../../../util/ComUtil'
import { getLoginUser } from '../../../lib/loginApi'
import { getConsumer, addOrder } from '../../../lib/shopApi'
import { Webview } from '../../../lib/webviewApi'
import { BLCT_TO_WON, exchangeWon2BLCTComma } from "../../../lib/exchangeApi"
import Style from './Style.module.scss'
import { ShopXButtonNav } from '../../common'

import { getBalanceOf, orderGoods } from '../../../lib/smartcontractApi'
import { getProducerByProducerNo } from '../../../lib/producerApi';
import { exchangeWon2BLCT } from '../../../lib/exchangeApi';

export default class Buy extends Component {

    constructor(props) {
        super(props);

        this.state = {
            goods: {},
            images: null,
            loginUser: {},
            tokenBalance: 0,
            order : {  //주문관련 정보 저장
                consumerNo: null,
                deliveryFee: 0,
                orderPrice: 0,    //최종 가격
                orderCnt: 1,
                deposit:0,
                orderDate:null,
                deliverMsg: '',

                //Goods에서 copy항목
                expectShippingStart:null,
                expectShippingEnd:null,
                packUnit:null,
                packAmount:0,
                packCnt:0,

                //Consumer에서 copy
                receiverName: '',
                receiverPhone: '',
                receiverAddr: ''
            },
            msgHidden: true,
            directMsg: ''
        }
    }

    componentDidMount() {
        console.log(this.props.location)
        // this.setState({
        //     order:{receiverName: this.props.location.state}
        // })
    }

    //화면이 그려지기 전에 로그인체크 해봄.
    async componentWillMount() {

        //로그인 체크
        const loginUser = await getLoginUser();
        if (!loginUser) { //미 로그인 시 로그인 창으로 이동.
            this.props.history.push('/login');
        }
        console.log({loginUser:loginUser})

        // 로그인한 사용자의 consumer 정보
        // loginUser.email로 consumer document 조회
        const loginUserInfo = await getConsumer();

        //파라미터로 상품정보 가져오기
        const params = new URLSearchParams(this.props.location.search)
        const goodsNo = params.get('goodsNo')

        const { data:goods } = await getGoodsByGoodsNo(goodsNo);
        console.log({ goodsNo: goodsNo, goods:goods, images:goods.goodsImages });

        console.log({loginUserInfo:loginUserInfo})

        //order 가격 등 계산
        let order = Object.assign({}, this.state.order);
        order.orderPrice = goods.reservationPrice - this.state.order.deliveryFee;
        //배송지정보 수정
        order.consumerNo = loginUserInfo.data.consumerNo;
        order.receiverName = loginUserInfo.data.name;
        order.receiverPhone = loginUserInfo.data.phone;
        order.receiverAddr = loginUserInfo.data.addr;

        this.setState({
            goods: goods,
            images: goods.goodsImages,
            loginUser: loginUserInfo.data,
            order: order
        })

        this.initContract();
    }

    initContract = async() => {
        this.tokenGethSC = new TokenGethSC();
        await this.tokenGethSC.initContract('/BloceryTokenSC.json');

        let balance = await getBalanceOf(this.tokenGethSC, this.state.loginUser.account)
        this.setState({
            tokenBalance: balance
        })
    };

    //array의 첫번째 이미지 썸네일 url 리턴
    getFirstImageUrl = (goodsImages) => {
        if (!goodsImages)
            return '';

        const image = goodsImages.filter((v, idx) => { return idx === 0;}) //첫번째 이미지
        if (image.length === 1) {
            return Server.getThumbnailURL() + image[0].imageUrl;
        }
        return '';
    }

    //구매 수량 변경.
    onCountChange = (e) => {

        let order = Object.assign({}, this.state.order);
        order.orderCnt = e.target.value;
        order.orderPrice = this.state.goods.reservationPrice * order.orderCnt;

        this.setState({
            order:order
        })
    }

    //배송 메세지 수정
    onMsgChange = (e) => {
        let order = Object.assign({}, this.state.order);

        if (e.target.value == 'direct') {
            this.setState({ msgHidden: false })
        } else {
            this.setState({ msgHidden: true })
            order.deliverMsg = e.target.selectedOptions[0].label;
        }
        this.setState({
            order:order
        })
    }

    //베송 메시지 직접 입력시
    directChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        let order = Object.assign({}, this.state.order);
        order.deliverMsg = this.state.directMsg
        this.setState({
            order:order
        })
    }

    // 필수정보 validation check
    checkValidation = () => {
        const order = Object.assign({}, this.state.order)
        const addr = order.receiverAddr || ''
        const phone = order.receiverPhone || ''
        order.reciverAddr = addr;
        order.reciverPhone = phone;

        this.setState({
            order: order
        })

        if (order.reciverAddr == '' || order.receiverName == '' || order.receiverAddr == '') {
            alert('배송지 정보를 정확하게 입력해주세요.')
            return false;
        }
    }

    onBuyClick = async () => {

        //order정보 생성.
        let order = Object.assign({}, this.state.order);

        // mongoDB 저장 전에 소비자 토큰잔액 체크
        let balance = await getBalanceOf(this.tokenGethSC, this.state.loginUser.account);
        let priceToken = exchangeWon2BLCT(this.state.order.orderPrice);

        if(balance < priceToken) {
            // TODO 토큰 구매페이지 이동 필요
            alert('토큰이 부족합니다. 토큰울 추가구입하세요');
            return;
        }

        //goods에서 필요한 attr copy
        ComUtil.objectAttrCopy(order, this.state.goods); //동일한 attribute Copy: goodsNm, expect.. packUnit packAmount packCnt

        order.consumerNo = this.state.loginUser.uniqueNo;
        order.producerNo = this.state.goods.producerNo;
        order.goodsNo = this.state.goods.goodsNo;

        //TODO 위약금 계산로직 개선필요 - 현재는 그냥 비례식
        order.deposit = this.state.order.orderPrice * 0.2;

        //수수료: 현재는 5%일괄 저장
        order.fee = this.state.order.orderPrice * 0.05;

        order.orderDate = ComUtil.getNow();

        this.checkValidation();

        const {data:orderNo} = await addOrder(order);

        //남은위약금, 남은수량 세팅
        let goods = Object.assign({}, this.state.goods);
        console.log({goods:goods, order:order });

        goods.remainedCnt = goods.remainedCnt - 1;
        goods.remainedDeposit = goods.remainedDeposit - order.deposit;
        console.log('goods.remainedDeposit;'+ goods.remainedDeposit);
        await updateGoodsRemained(goods);

        if (orderNo) { //구매 성공시 confirm으로 이동.
            this.setState({
                goods: goods,
                order: order
            });

            // 소비자 토큰 지급
            this.payOrderToken(orderNo);
            this.props.history.push('/buyConfirm?orderNo='+ orderNo);
        }
    }

    // 배송지 정보 수정 버튼 클릭
    updateAddressClick = () => {
        const order = Object.assign({}, this.state.order)
        const addr = order.receiverAddr || ''
        const phone = order.receiverPhone || ''
        order.receiverAddr = addr;
        order.receiverPhone = phone;

        this.setState({
            order: order
        })
        // 배송지 정보 수정 화면으로 consumerNo, addr, phone, name을 param으로 넘김
        Webview.openPopup(`/inputAddress?consumerNo=${order.consumerNo}&receiverAddr=${order.receiverAddr}&receiverPhone=${order.receiverPhone}&receiverName=${order.receiverName}`, this.callback)
    }

    // 배송지 정보 수정 화면에서 수정된 내용 callback으로 받아옴
    callback = (response) => {
        const {param} = JSON.parse(response.data)
        const order = Object.assign({}, this.state.order)
        this.setState({
            order: order
        })
    }

    payOrderToken = async(orderNo) => {

        let producer = await getProducerByProducerNo(this.state.goods.producerNo);
        console.log('producer : ', producer);

        console.log('fee???? ', this.state.order.fee);
        let account = producer.data.account;
        let tokenPrice = exchangeWon2BLCT(this.state.order.orderPrice);
        let tokenDeposit = exchangeWon2BLCT(this.state.order.deposit);
        let tokenFee = exchangeWon2BLCT((this.state.order.fee / 5) * 4);
        let tokenCustomerReward = exchangeWon2BLCT(this.state.order.fee / 5);

        await orderGoods(this.tokenGethSC, orderNo, account, this.state.goods.goodsNo, tokenPrice, tokenDeposit, tokenFee, tokenCustomerReward);
    };

    render() {
        return(
            <Fragment>
                <ShopXButtonNav close>구매하기</ShopXButtonNav>
                <Container>
                    {/* 상품 정보 */}
                    <br/>
                    <Row>
                        <Col xs={'12'}> 상품 정보 </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs={'3'}>
                            <img src={this.getFirstImageUrl(this.state.images)} />
                        </Col>
                        <Col xs={'0.5'}/>
                        <Col>
                            <small>{this.state.goods.itemNm} </small><br/>
                            {this.state.goods.goodsNm} {this.state.goods.packAmount + ' ' + this.state.goods.packUnit}<br/>

                            <Row>
                                <Col> 수량 </Col>
                                <Col>
                                    <Input type='select' name='select' id='buyCount' onChange={this.onCountChange}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </Col>
                            </Row>

                            <small>
                                배송예정일: {ComUtil.utcToString(this.state.goods.expectedShippingStart)} ~&nbsp;
                                {ComUtil.utcToString(this.state.goods.expectedShippingStart)}
                            </small>
                        </Col>
                    </Row>
                    <hr className = {Style.hrBold}/>

                    <Row>
                        <Col xs={'4'}/>
                        <Col xs={'3.5'} className={Style.textNotiR}>
                            {ComUtil.addCommas(this.state.order.orderPrice)} 원
                        </Col>
                        <Col xs={'1.5'} className={Style.textNotiLs}>
                            ({(this.state.goods.shipPrice-this.state.goods.reservationPrice)*100/this.state.goods.shipPrice}%)
                        </Col>
                        <Col xs={'3'} className={Style.textLineS}>
                            {ComUtil.addCommas(this.state.goods.shipPrice * this.state.order.orderCnt)}원
                        </Col>
                    </Row>

                    {/* 배송지 정보 */}
                    <hr className = {Style.hrBold}/>
                    <Row>
                        <Col xs={'9'}> 배송지 정보 </Col>
                        <Col xs={'3'}>
                            <Button outline color="secondary" size="sm" className="float-right" onClick={this.updateAddressClick}>수정</Button>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs={'3'}>
                            <small>
                            받는 사람<br/>
                            연락처<br/>
                            주소<br/>
                            </small>
                        </Col>
                        <Col xs={'9'} className={'text-right'}>
                            <small>
                                {this.state.order.receiverName} <br/>
                                {this.state.order.receiverPhone}<br />
                                {this.state.order.receiverAddr}<br/>
                            </small>
                        </Col>
                    </Row>

                    {/* 배송 메세지 */}
                    <hr className = {Style.hrBold}/>
                    <Row>
                        <Col xs={'12'}> 배송 메세지 </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col>
                            <Input type='select' name='select' id='deliverMsg' onChange={this.onMsgChange}>
                                <option name='radio1' value=''>베송 메세지를 선택해 주세요.</option>
                                <option name='radio2' value='radio1'>집 앞에 놔주세요.</option>
                                <option name='radio3' value='radio2'>택배함에 놔주세요.</option>
                                <option name='radio4' value='radio3'>배송 전 연락주세요.</option>
                                <option name='radio5' value='radio4'>부재 시 연락주세요.</option>
                                <option name='radio6' value='radio5'>부재 시 경비실에 맡겨주세요.</option>
                                <option name='radio7' value='direct'>직접 입력</option>
                            </Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input type={this.state.msgHidden? 'hidden':'text'} name='directMsg' placeholder='베송 메세지를 입력해 주세요.' value={this.state.directMsg} onChange={this.directChange}/>
                        </Col>
                    </Row>

                    {/* 총 결제금액 */}
                    <hr className = {Style.hrBold}/>
                    <Row>
                        <Col xs={'12'}> 결제금액</Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs={'8'} className={Style.textSmall}> 출하 후 상품금액 </Col>
                        <Col xs={'4'} className={Style.textRs}>
                            {ComUtil.addCommas(this.state.goods.shipPrice * this.state.order.orderCnt)} 원
                        </Col>
                    </Row>
                    {/*
                    <Row>
                        <Col xs={'8'}> <small> 배송비 </small></Col>
                        <Col xs={'4'} className={Style.textRs} > 2,500 원 </Col>
                    </Row>
                    */}
                    <Row>
                        <Col xs={'8'} className={Style.textSmall}> 예약 할인금액 </Col>
                        <Col xs={'4'} className={Style.textNotiRs}>
                            {ComUtil.addCommas((this.state.goods.reservationPrice - this.state.goods.shipPrice) * this.state.order.orderCnt)} 원
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs={'8'}> 총 결제금액 </Col>
                        <Col xs={'4'} className={Style.textRight}> {ComUtil.addCommas(this.state.order.orderPrice)} 원 </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs={'8'}> 최종 결제금액(BLCT) </Col>
                        <Col xs={'4'} className={Style.textNotiR}> {exchangeWon2BLCTComma(this.state.order.orderPrice)} BLCT </Col>
                    </Row>
                    <Row>
                        <Col xs={'8'} className={Style.textSmall}>  1 BLCT = { BLCT_TO_WON } 원 </Col>
                        <Col xs={'4'} className={Style.textRs}> 보유 {this.state.tokenBalance} BLCT </Col>
                    </Row>

                    <br/>
                    <br/>
                    <br/>
                </Container>

                <div className='buy'>
                    <div><Button color='warning' block onClick={this.onBuyClick}> 결 제 </Button></div>
                </div>
            </Fragment>
        )
    }
}




