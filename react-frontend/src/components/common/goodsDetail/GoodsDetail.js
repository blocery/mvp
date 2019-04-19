import React, { Fragment, Component } from 'react'
//import './GoodsDetail.scss'
import Style from './GoodsDetail.module.scss'
import { Button, Table, Container, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faShoppingCart, faCarrot, faAppleAlt, faCartPlus, faCartArrowDown, faStar, faStarHalf,
    faShareAlt

} from '@fortawesome/free-solid-svg-icons'
import ComUtil from '../../../util/ComUtil'
import { getGoods, getGoodsByGoodsNo } from '../../../lib/goodsApi'
import { getProducerByProducerNo } from '../../../lib/producerApi'

import GoodsImage from './GoodsImage'

import TabSection from './TabSection'

import { FarmDiaryCard } from '../../common/cards'
import { Server } from '../../../components/Properties'

import { Webview } from '../../../lib/webviewApi'

export default class GoodsDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            goods: {},
            producer: {},
            farmDiaries: [],
            images: null
        }
    }
    componentDidMount(){

        this.search()
    }

    search = async () => {

        this.setState({loading: true})
        const goodsNo = this.props.goodsNo

        const { data:goods } = await getGoodsByGoodsNo(goodsNo)
        console.log('goods:',goods)
        const { data:producer } = await getProducerByProducerNo(goods.producerNo)

        //this.sortDesc(goods.cultivationDiaries)

        const farmDiaries = this.getFilteredData(goods)

        this.sortDesc(farmDiaries)

        this.setState({
            loading: false,
            goods: goods,
            producer: producer,
            images: goods.goodsImages,
            farmDiaries: farmDiaries.splice(0, 3)   //3건만
        })

    }
    //재배일지 등록일자 내림차순 정렬
    sortDesc = (data) => {
        data.sort((a,b)=>{
            //return a.diaryRegDate < b.diaryRegDate ? -1 : a.diaryRegDate > b.diaryRegDate ? 1 : 0
            return b.diaryRegDate - a.diaryRegDate
        })
    }
    //goods 에서 card 에 바인딩 할 object 반환
    getFilteredData = (goods) => {
        const { goodsNo, goodsNm } = goods
        const serverImageUrl = Server.getImageURL()
        console.log('getFileterdData', goods)
        return goods.cultivationDiaries.map((cultivationDiary)=>{
            return {
                goodsNo: goodsNo,
                goodsNm: goodsNm,
                imageUrl: serverImageUrl+cultivationDiary.diaryImages[0].imageUrl,
                ...cultivationDiary
            }
        })
    }


    onBuyClick = () => {
        const goodsNo = this.props.goodsNo;
        console.log(this.props)
        //TODO 팝엄창으로 변경
        // this.props.history.push('/buy?goodsNo=3'); //구매로 이동

        Webview.openPopup('/buy?goodsNo=3') //구매로 이동
    }

    render(){

        const {
            // goodsNo,            //순번
            // producerNo,         //생산자번호
            goodsNm,            //상품명
            goodsImages,        //상품이미지
            searchTag,          //태그
            // itemNo,             //품목번호
            itemNm,             //품목명
            breedNm,            //품종
            productionArea,     //생산지
            // cultivationNo,      //재배방법번호
            cultivationNm,      //재배방법명
            productionStart,    //생산시작일
            expectShippingStart,//예상출하시작일
            expectShippingEnd,  //예상출하마감일
            pesticideYn,        //농약유무
            packUnit,           //포장단위
            packAmount,         //포장 양
            packCnt,            //판매개수
            shipPrice,          //출하 후 판매가
            reservationPrice,   //예약 시 판매가
            //cultivationDiary  //재배일지
            // contractHash,       //블록체인 저장된 해시값
        } = this.state.goods
        const { name, farmName } = this.state.producer
        const perSale = Math.round((1 - (reservationPrice / shipPrice)) * 100)

        const tabSectionData = [{name:'상품설명', active: true},
            {name:'구매안내', active: false},
            {name:'재배일지', active: false},
            {name:'후기', active: false}]

        return(
            <Fragment>
                {/* 상품이미지 */}
                {
                    goodsImages && <GoodsImage images={goodsImages} />
                }

                {/* 상품정보 */}
                <div className={Style.containerGoods}>
                    <div className={Style.share}>
                        <FontAwesomeIcon icon={faShareAlt} color={'white'} size={'2x'}/>
                    </div>
                    <h4>{goodsNm} {packAmount}{packUnit}</h4>
                    <h5>{ComUtil.addCommas(reservationPrice)}원
                        <span className='text-danger'> {perSale}% </span>
                        <small>
                            <strike>{ComUtil.addCommas(shipPrice)}</strike>
                        </small>
                    </h5>
                    예약특가 남은시간 12:13:05<br/>
                    {/*{ComUtil.utcToString(expectShippingStart)} 부터 배송시작<br/>*/}
                    <p>
                        <FontAwesomeIcon icon={faStar} color={'#1697ae'} size={'lg'}/>
                        <FontAwesomeIcon icon={faStar} color={'#1697ae'} size={'lg'}/>
                        <FontAwesomeIcon icon={faStar} color={'#1697ae'} size={'lg'}/>
                        <FontAwesomeIcon icon={faStar} color={'#1697ae'} size={'lg'}/>
                        <FontAwesomeIcon icon={faStar} color={'#88c4d8'} size={'lg'}/>
                        <small> 1,345개구매</small>
                    </p>

                    <div className={Style.sharpTag}>
                        #{searchTag}
                    </div>
                </div>

                {/* 상품정보(원산지) */}
                {/*<div className='container-goods-trace'>*/}
                    {/*<h6>생산자 : {`${name}(${farmName})`}</h6>*/}
                    {/*<h6>생산지 : {productionArea}</h6>*/}
                    {/*<h6>품목 품종 : {itemNm} {breedNm}</h6>*/}
                    {/*<h6>재배방법 : {cultivationNm}</h6>*/}
                    {/*<h6>생산시작 : {ComUtil.utcToString(productionStart)}</h6>*/}
                    {/*<h6>예상출하시작 : {ComUtil.utcToString(expectShippingStart)}</h6>*/}
                    {/*<h6>예상출하마감 : {ComUtil.utcToString(expectShippingEnd)}</h6>*/}
                    {/*<h6>농약유무 : {pesticideYn === 'Y' ? '농약' : '무농약'}</h6>*/}
                    {/*<h6>포장단위 : {packUnit}</h6>*/}
                    {/*<h6>포장 양 : {packAmount}</h6>*/}
                    {/*<h6>판매개수 : {packCnt}</h6>*/}
                {/*</div>*/}


                <Container>
                    <h5>기본정보</h5>
                    <table>
                        <tbody>
                        <tr>
                            <td className={Style.title}>생산자</td>
                            <td>{name}</td>
                            <td className={Style.title}>생산지</td>
                            <td>{farmName}</td>
                        </tr>
                        <tr>
                            <td className={Style.title}>품목</td>
                            <td>{itemNm}</td>
                            <td className={Style.title}>품종</td>
                            <td>{breedNm}</td>
                        </tr>
                        <tr>
                            <td className={Style.title}>재배방법</td>
                            <td>{cultivationNm}</td>
                            <td className={Style.title}>농약유무</td>
                            <td>{pesticideYn}</td>
                        </tr>
                        <tr>
                            <td className={Style.title}>포장단위</td>
                            <td>{packUnit}</td>
                            <td className={Style.title}>배송방법</td>
                            <td>택배</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className='title'>생산시작</td>
                            <td colSpan={2}>{ComUtil.utcToString(productionStart)}</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className='title'>출하기간(예상)</td>
                            <td colSpan={2}>{ComUtil.utcToString(expectShippingStart)} ~ {ComUtil.utcToString(expectShippingEnd)}</td>
                        </tr>
                        </tbody>
                    </table>
                </Container>
                <br/>

                <TabSection items={tabSectionData} activeIndex={0}/>



                {/* 상품설명 */}
                <div className={Style.containerGoodsDetail}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                </div>


                <TabSection items={tabSectionData} activeIndex={1}/>


                { /* 구매안내 */ }
                <div className={Style.containerGoodsPurcaseInfo}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                </div>

                <TabSection items={tabSectionData} activeIndex={2}/>

                { /* 재배일지 */ }
                <div className={Style.containerGoodsFarmDiary}>
                    {
                        this.state.farmDiaries.map((farmDiary, index)=>{
                            return <FarmDiaryCard key={farmDiary.imageUrl + index} {...farmDiary} />
                        })
                    }
                </div>

                <TabSection items={tabSectionData} activeIndex={3}/>

                { /* 후기 */ }
                <div className={Style.containerGoodsReview}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                </div>
                <br/>
                <br/>
                <br/>
                <div className={Style.buy}>
                    <div><Button color='info' block>장바구니</Button></div>
                    <div><Button color='warning' block onClick={this.onBuyClick}>즉시구매</Button></div>
                </div>
            </Fragment>
        )
    }
}