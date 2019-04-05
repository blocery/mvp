import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Input, FormGroup, Label, Button, Fade, FormFeedback, Badge} from 'reactstrap'
import { RadioButtons, ImageUploader } from '../../common'
import DatePicker from 'react-date-picker'
import Style from './GoodsReg.module.scss'

import { addGoods } from '../../../lib/producerApi'

import { ToastContainer, toast } from 'react-toastify'                              //토스트
import 'react-toastify/dist/ReactToastify.css'

export default class GoodsReg extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            dropdownOpen: false,
            bindData:{
                cultivationNm: null,//재배방법
                pesticideYn: null,  //농약유무
                item: null,         //품목
                packUnit: null,     //포장단위
            },

            //input name에 사용
            names: {
                goodsNm: 'goodsNm',              //상품명
                // goodsImages: 'goodsImages',	        //상품이미지
                searchTag: 'searchTag',	        //태그
                itemNo: 'itemNo',	            //품목번호
                // itemNm: 'itemNm',	            //품목
                breedNm: 'breedNm',	                //품종
                productionArea: 'productionArea',	//생산지
                // cultivationNm: 'cultivationNm',	    //재배방법명
                productionStart: 'productionStart',      //생산시작일
                expectShippingStart: 'expectShippingStart',  //예상출하시작일
                expectShippingEnd: 'expectShippingEnd',    //예상출하마감일
                // pesticideYn: 'pesticideYn',	        //농약유무
                // packUnit: 'packUnit',	            //포장단위
                packAmount: 'packAmount',	        //포장 양
                packCnt: 'packCnt',	            //판매개수
                shipPrice: 'shipPrice',	        //출하 후 판매가
                reservationPrice: 'reservationPrice',	    //예약 시 판매가
            },

            //등록시 사용
            goods: {
                goodsNo: null,
                goodsNm: '',              //상품명
                goodsImages: [],	        //상품이미지
                searchTag: '',	        //태그
                itemNo: 1,	            //품목번호
                itemNm: '상추',	            //품목
                breedNm: '',	            //품종
                productionArea: '',	    //생산지
                //cultivationNo: '',	    //재배방법번호
                cultivationNm: '유기농',	    //재배방법명
                productionStart: null,      //생산시작일
                expectShippingStart: null,  //예상출하시작일
                expectShippingEnd: null,    //예상출하마감일
                pesticideYn: null,	        //농약유무
                packUnit: 'kg',	            //포장단위
                packAmount: '',	        //포장 양
                packCnt: '',	            //판매개수
                shipPrice: '',	        //출하 후 판매가
                reservationPrice: '',	    //예약 시 판매가
                // cultivationDiary: '',	    //재배일지
                confirm: false,             //상품목록 노출 여부
                contentImages: [],          //상품설명 이미지
            },

            //밸리데이션 체크 검증
            isValidated: {
                goodsNm: false,
                breedNm: false,
                productionStart: false,      //생산시작일
                expectShippingStart: false,  //예상출하시작일
                expectShippingEnd: false,    //예상출하마감일
                goodsImages: false,
                packAmount: false,
                packCnt: false,
                shipPrice: false,
                reservationPrice: false,
                contentImages: false,       //상품설명 이미지
            },

            // validationCnt: 0
        }
    }

    componentDidMount(){
        this.search()
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    search = () => {

        //품목
        const item = [
            {itemNm:'상추', itemNo:1},
            {itemNm:'배추', itemNo:2},
            {itemNm:'양파', itemNo:3},
            {itemNm:'고추', itemNo:4},
            {itemNm:'사과', itemNo:5},
            {itemNm:'오이', itemNo:6},
        ]

        //재배방법
        const cultivationNm = [
            { cultivationNm:'토지'},
            { cultivationNm:'온실'},
            { cultivationNm:'수경재배'}
        ]

        //농약유무
        const pesticideYn = [
            {pesticideYn:'유기농'},
            {pesticideYn:'무농약'},
            {pesticideYn:'농약사용'},
        ]

        const packUnit = [
            {packUnit:'kg'},
            {packUnit:'g'},
            {packUnit:'근'},
        ]

        this.setState({
            bindData:{
                item: item,                     //품목
                cultivationNm: cultivationNm,   //재배방법
                pesticideYn: pesticideYn,       //농약유무
                packUnit: packUnit,             //포장단위
            }
        })
    }

    //대표상품 이미지
    onGoodsImageChange = (images) => {
        const state = Object.assign({}, this.state)
        state.goods.goodsImages = images

        //validation 체크
        state.isValidated.goodsImages = images.length > 0
        // state.validationCnt = this.getValidationCnt()

        this.setState(state)
    }
    //상품설명 이미지
    onContentImageChange = (images) => {
        const state = Object.assign({}, this.state)
        state.goods.contentImages = images

        //validation 체크
        state.isValidated.contentImages = images.length > 0
        // state.validationCnt = this.getValidationCnt()

        this.setState(state)
    }

    //품목
    onItemClick = ({itemNo, itemNm}) => {
        const state = Object.assign({}, this.state)
        state.goods.itemNo = itemNo
        state.goods.itemNm = itemNm
        this.setState(state)
    }

    //재배방법
    onCultivationNmClick = ({cultivationNm}) => {
        const state = Object.assign({}, this.state)
        state.goods.cultivationNm = cultivationNm
        this.setState(state)
    }

    //농약유무
    onPesticideYnClick  = ({pesticideYn}) => {
        const state = Object.assign({}, this.state)
        state.goods.pesticideYn = pesticideYn
        this.setState(state)
    }
    //포장단위
    onPackUnitClick = ({packUnit}) => {
        const state = Object.assign({}, this.state)
        state.goods.packUnit = packUnit
        this.setState(state)
    }
    //달력
    onCalendarChange = (name, date)=> {
        const state = Object.assign({}, this.state)
        state.goods[name] = date

        //validation 체크용
        state.isValidated[name] = date !== null
        // state.validationCnt = this.getValidationCnt()

        this.setState(state)
    }

    //인풋박스
    onInputChange = (e) => {
        const el = e.target
        const state = Object.assign({}, this.state)
        state.goods[el.name] = el.value

        //validation 체크용
        const valStatus = this.checkValidation(e)
        state.isValidated[el.name] = valStatus
        // state.validationCnt = this.getValidationCnt()


        this.setState(state)
    }

    //밸리데이션 체크를 모두 했는지 검증
    checkValidation = (e) => {
        const hasValidKey = Object.keys(this.state.isValidated).some(key=>key === e.target.name)
        return hasValidKey ? e.target.value.trim() !== '' : true
    }

    //임시저장
    onAddTempGoodsClick = async (e) => {
        const goods = Object.assign({}, this.state.goods)

        if(goods.goodsNm.length <= 0){
            this.notify('상품명은 필수 입니다', toast.error)
            return
        }
        this.save(goods)

    }

    //상품노출
    onAddGoodsClick = async (e) => {

        if(!this.canConfirm()){
            this.notify('필수입력이 모두 되어야 노출 가능힙니다', toast.error)
            return
        }

        if(window.confirm(['상품을 등록 하시겠습니까? 앞으로 수정 및 삭제가 불가능 합니다!'])){
            const goods = Object.assign({}, this.state.goods)
            goods.confirm = true //상품목록에 노출
            this.save(goods)
        }
    }


    //저장
    save = async (goods) => {
        const request = await addGoods(goods)
        if(request.status !== 200) alert('등록이 실패 하였습니다')
        else{
            this.notify('저장되었습니다', toast.success)
            goods.goodsNo = request.data
            this.setState({
                goods: goods
            })
        }
    }

    // onInputBlur = (e) => {
    //     const status = e.target.value.replace('', '').length > 0
    //     const valid = Object.assign({}, this.state.valid)
    //     valid[e.target.name] = status
    //
    //     this.setState({
    //         valid:valid
    //     })
    // }

    //상품노출 가능여부
    canConfirm = () => {
        const isValidated = this.state.isValidated
        let isFailed = Object.keys(isValidated).some(key=>isValidated[key] === false)
        return !isFailed
    }

    getValidationCnt = () => {
        let cnt = 0
        Object.keys(this.state.isValidated).map(key=>{
            if(!this.state.isValidated[key])
                cnt++
        })

        return cnt
    }

    //react-toastify
    notify = (msg, toastFunc) => {
        toastFunc(msg, {
            position: toast.POSITION.TOP_RIGHT
            //className: ''     //클래스를 넣어도 됩니다
        })
    }

    render() {

        const {
            goodsNm,              //상품명
            goodsImages,
            searchTag,	        //태그
            breedNm,	            //품종
            productionArea,	    //생산지
            productionStart,      //생산시작일
            expectShippingStart,  //예상출하시작일
            expectShippingEnd,    //예상출하마감일
            packAmount,	        //포장 양
            packCnt,	            //판매개수
            shipPrice,	        //출하 후 판매가
            reservationPrice,	    //예약 시 판매가
        } = this.state.goods

        const star = <span className='text-danger'>*</span>
        //const validationCnt = this.getValidationCnt()

        return(
            <div className={Style.wrap}>

                {
                    this.state.validationCnt > 0 && (
                        <div className={Style.badge}>
                            <Badge color="danger" pill>필수{this.state.validationCnt}</Badge>
                        </div>
                    )
                }
                <div>
                    <NavLink className={'text-info'} to={'/producer/goodsList'} >상품목록</NavLink>
                    <NavLink className={'text-info'} to={'/producer/goodsReg'} >상품등록</NavLink>
                    <NavLink className={'text-info'} to={'/producer/orderList'} >주문목록</NavLink>
                </div>
                <Container fluid>
                <h3 className={'text-center'}>
                    상품등록
                </h3>
                <FormGroup>
                    <Label>대표상품 이미지</Label>
                    <ImageUploader onChange={this.onGoodsImageChange} multiple={true} limit={10}/>
                    { <Fade in={this.state.goods.goodsImages.length <= 0} className="text-danger" >이미지는 최소 1장이상 필요합니다</Fade> }
                </FormGroup>
                <hr/>
                <FormGroup>
                    <Label>상품설명 이미지</Label>
                    <ImageUploader onChange={this.onContentImageChange} multiple={true} limit={10}/>
                    { <Fade in={this.state.goods.contentImages.length <= 0} className="text-danger" >이미지는 최소 1장이상 필요합니다</Fade> }
                </FormGroup>
                <hr/>
                <FormGroup>
                    <Label>상품명{star}</Label>
                    <Input valid={this.state.isValidated.goodsNm} invalid={!this.state.isValidated.goodsNm} name={this.state.names.goodsNm} value={goodsNm} onChange={this.onInputChange} />
                    <FormFeedback invalid>필수 입력값입니다</FormFeedback>
                    {/*<FormFeedback valid>성공!</FormFeedback>*/}
                </FormGroup>
                <FormGroup>
                    <Label>태그</Label>
                    <Input name={this.state.names.searchTag} value={searchTag} onChange={this.onInputChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>품목{star}</Label>
                    <RadioButtons nameField='itemNm' data={this.state.bindData.item || []} onClick={this.onItemClick} />
                </FormGroup>
                <FormGroup>
                    <Label>품종{star}</Label>
                    <Input valid={this.state.isValidated.breedNm} invalid={!this.state.isValidated.breedNm} name='breedNm' value={breedNm} onChange={this.onInputChange}/>
                    <FormFeedback invalid>필수 입력값입니다</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label>생산지{star}</Label>
                    <Input valid={this.state.isValidated.productionArea} invalid={!this.state.isValidated.productionArea} name={this.state.names.productionArea} value={productionArea} placeholder='ex)전남 여수' onChange={this.onInputChange} />
                    <FormFeedback invalid>필수 입력값입니다</FormFeedback>
                    {/*<FormFeedback valid>성공!</FormFeedback>*/}
                </FormGroup>
                <FormGroup>
                    <Label>재배방법</Label>
                    <RadioButtons nameField='cultivationNm' data={this.state.bindData.cultivationNm || []} onClick={this.onCultivationNmClick} />
                </FormGroup>
                <FormGroup>
                    <Label>생산시작일{star}</Label>
                    <div>
                        <DatePicker
                            onChange={this.onCalendarChange.bind(this, this.state.names.productionStart)}
                            value={productionStart}
                        />
                        <FormFeedback invalid>필수 입력값입니다</FormFeedback>
                        { <Fade in={!this.state.goods.productionStart} className="text-danger">날짜는 필수입니다</Fade> }
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label>예상출하시작일{star}</Label>
                    <div>
                        <DatePicker
                            onChange={this.onCalendarChange.bind(this, this.state.names.expectShippingStart)}
                            value={expectShippingStart}
                        />
                        { <Fade in={!this.state.goods.expectShippingStart} className="text-danger">날짜는 필수입니다</Fade> }
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label>예상출하마감일{star}</Label>
                    <div>
                        <DatePicker
                            onChange={this.onCalendarChange.bind(this, this.state.names.expectShippingEnd)}
                            value={expectShippingEnd}
                        />
                        { <Fade in={!this.state.goods.expectShippingEnd} className="text-danger">날짜는 필수입니다</Fade> }
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label>농약유무</Label>
                    <RadioButtons nameField='pesticideYn' data={this.state.bindData.pesticideYn || []} onClick={this.onPesticideYnClick} />
                </FormGroup>
                <FormGroup>
                    <Label>포장단위{star}</Label>
                    <RadioButtons nameField='packUnit' data={this.state.bindData.packUnit || []} onClick={this.onPackUnitClick} />
                </FormGroup>
                <FormGroup>
                    <Label>포장 양{star}</Label>
                    <Input valid={this.state.isValidated.packAmount} invalid={!this.state.isValidated.packAmount} name={this.state.names.packAmount} value={packAmount} onChange={this.onInputChange} type={'number'}/>
                    <FormFeedback invalid>필수(숫자) 입력값입니다</FormFeedback>
                    {/*<FormFeedback valid>성공!</FormFeedback>*/}
                </FormGroup>
                <FormGroup>
                    <Label>판매개수{star}</Label>
                    <Input valid={this.state.isValidated.packCnt} invalid={!this.state.isValidated.packCnt} name={this.state.names.packCnt} value={packCnt} onChange={this.onInputChange} type={'number'}/>
                    <FormFeedback invalid>필수(숫자) 입력값입니다</FormFeedback>
                    {/*<FormFeedback valid>성공!</FormFeedback>*/}
                </FormGroup>
                <FormGroup>
                    <Label>예약 시 판매가{star}</Label>
                    <Input valid={this.state.isValidated.reservationPrice} invalid={!this.state.isValidated.reservationPrice} name={this.state.names.reservationPrice} value={reservationPrice} onChange={this.onInputChange} type={'number'}/>
                    <FormFeedback invalid>필수(숫자) 입력값입니다</FormFeedback>
                    {/*<FormFeedback valid>성공!</FormFeedback>*/}
                </FormGroup>
                <FormGroup>
                    <Label>출하 후 판매가{star}</Label>
                    <Input valid={this.state.isValidated.shipPrice} invalid={!this.state.isValidated.shipPrice} name={this.state.names.shipPrice} value={shipPrice} onChange={this.onInputChange} type={'number'}/>
                    <FormFeedback invalid>필수(숫자) 입력값입니다</FormFeedback>
                    {/*<FormFeedback valid>성공!</FormFeedback>*/}
                </FormGroup>
                {/*<FormGroup>*/}
                    {/*<Label>재배일지xxx</Label>*/}
                    {/*<Input/>*/}
                {/*</FormGroup>*/}

                <br/>
                <br/>
            </Container>
                <footer className={Style.footer}>

                    {
                        !this.state.goods.confirm && <Button onClick={this.onAddTempGoodsClick} color='info'>상품임시저장</Button>
                    }
                    {
                        this.state.goods.goodsNo && !this.state.goods.confirm && <Button onClick={this.onAddGoodsClick} color='danger'>상품노출</Button>
                    }
                    {
                        this.state.goods.confirm && '상품이 노출되어 수정/삭제 불가능 합니다'
                    }
                </footer>
                <ToastContainer />  {/* toast 가 그려질 컨테이너 */}
            </div>
        )
    }
}
