import React, {Fragment, Component } from 'react'
import { Container, InputGroup, InputGroupAddon, InputGroupText, Input, Form, Row, Col, FormGroup, Label, Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom'
import { getGoods, getGoodsByGoodsNo } from '../../../lib/commonApi'
import { Server } from '../../Properties'
import ComUtil from '../../../util/ComUtil'
import { getLoginUser } from '../../../lib/loginApi'
import Style from './Style.module.scss'


export default class Buy extends Component {

    constructor(props) {
        super(props);

        this.state = {
            goods: {},
            images: null,
            consumer: {}
        }
    }

    //화면이 그려지기 전에 로그인체크 해봄.
    async componentWillMount() {

        //로그인 체크
        const consumer = await getLoginUser();
        if (!consumer) { //미 로그인 시 로그인 창으로 이동.
            this.props.history.push('/login');
        }

        //파라미터로 상품정보 가져오기
        const params = new URLSearchParams(this.props.location.search)
        const goodsNo = params.get('goodsNo')

        const { data:goods } = await getGoodsByGoodsNo(goodsNo);
        //console.log({goodsNo: goodsNo, goods:goods, images:goods.goodsImages });

        this.setState({
            goods: goods,
            images: goods.goodsImages,
            consumer: consumer
        })
    }

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

    render() {
        return(
            <Fragment>
                <Container>
                    <br/> {/* 구매하기 */}
                    <h5 className={'text-center'}> 구매하기 </h5>

                    {/* 상품 정보 */}
                    <hr className = {Style.hrBold}/>
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
                            {this.state.goods.goodsNm} {this.state.goods.packCnt + ' ' + this.state.goods.packUnit}<br/>

                            <Row>
                                <Col> 수량 </Col>
                                <Col>
                                    <Input type='select' name='select' id='buyCount'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </Col>
                            </Row>

                            <small>
                                배송예정일: {ComUtil.utcToString(this.state.goods.expectedShippingStart)} ~&npsp;
                                {ComUtil.utcToString(this.state.goods.expectedShippingStart)}
                            </small>
                        </Col>
                    </Row>
                    <hr className = {Style.hrBold}/>

                    <Row>
                        <Col xs={'9'}/>
                        <Col xs={'3'}>
                            {this.state.goods.shipPrice} 원
                        </Col>
                    </Row>

                    {/* 배송지 정보 */}
                    <hr className = {Style.hrBold}/>
                    <Row>
                        <Col xs={'12'}> 배송지 정보 </Col>
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
                                {this.state.consumer.name} <br/>
                                010-234-1798<br/>
                                경기도 관양시 동안구 20-9번지 3층 <br/>
                            </small>
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
                        <Col xs={'4'} className={Style.textRs}>  6,800 원 </Col>
                    </Row>
                    <Row>
                        <Col xs={'8'}> <small> 배송비 </small></Col>
                        <Col xs={'4'} className={Style.textRs} > 2,500 원 </Col>
                    </Row>
                    <Row>
                        <Col xs={'8'} className={Style.textSmall}> 예약 할인금액 </Col>
                        <Col xs={'4'} className={Style.textNotiRs}> -3,400 원 </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs={'8'}> 총 결제금액 </Col>
                        <Col xs={'4'} className={Style.textRight}> 5,900 원 </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col xs={'8'}> 최종 결제금액(BLCT) </Col>
                        <Col xs={'4'} className={Style.textNotiR}> 236 BLCT </Col>
                    </Row>
                    <Row>
                        <Col xs={'8'} className={Style.textSmall}>  1 BLCT = 25원 </Col>
                        <Col xs={'4'} className={Style.textRs}> 보유 2,700 BLCT </Col>
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




