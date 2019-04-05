import React, { Fragment, Component } from 'react'
import './GoodsDetail.scss'
import { Button, Table, Container, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faShoppingCart, faCarrot, faAppleAlt, faCartPlus, faCartArrowDown, faStar, faStarHalf,
    faShareAlt

} from '@fortawesome/free-solid-svg-icons'
import ComUtil from '../../../util/ComUtil'
import { getGoods, getGoodsByGoodsNo } from '../../../lib/commonApi'
import { getProducerByProducerNo } from '../../../lib/producerApi'

import GoodsImage from './GoodsImage'

import TabSection from './TabSection'


export default class Goods extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            goods: {},
            producer: {},
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
        console.log( {goods:goods,producer:producer})
        this.setState({
            loading: false,
            goods: goods,
            producer: producer,
            images: goods.goodsImages
        })

    }

    onBuyClick = () => {
        const goodsNo = this.props.goodsNo;
        console.log(this.props)
        //TODO 팝엄창으로 변경
        this.props.history.push('/buy?goodsNo=3'); //구매로 이동
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
            {name:'재배일지(7)', active: false},
            {name:'후기(19)', active: false}]

        return(
            <Fragment>
                {/* 상품이미지 */}
                {
                    goodsImages && <GoodsImage images={goodsImages} />
                }

                {/*/!* 상품이미지 *!/*/}
                {/*<div>*/}
                {/*/!* 상품이미지 *!/*/}
                {/*<div className='container-goods-img'>*/}
                {/*<img className='img-big' src={'http://localhost:8080/images/1a8mxPOk1gej.jpg'}/>*/}
                {/*<div className='btn-back'><FontAwesomeIcon icon={faAngleLeft} size={'2x'} /></div>*/}
                {/*<div className='btn-next'><FontAwesomeIcon icon={faAngleRight} size={'2x'} /></div>*/}
                {/*</div>*/}

                {/*/!* 상품 썸네일 *!/*/}
                {/*<div className='container-goods-img-list'>*/}
                {/*<img src={'http://localhost:8080/thumbnails/iYPH172GOXHb.jpeg'} />*/}
                {/*<img src={'http://localhost:8080/thumbnails/iYPH172GOXHb.jpeg'} />*/}
                {/*<img src={'http://localhost:8080/thumbnails/iYPH172GOXHb.jpeg'} />*/}
                {/*<img src={'http://localhost:8080/thumbnails/ts9cgzVLshSK.jpg'} />*/}
                {/*<img src={'http://localhost:8080/thumbnails/iYPH172GOXHb.jpeg'} />*/}
                {/*<img src={'http://localhost:8080/thumbnails/ts9cgzVLshSK.jpg'} />*/}
                {/*<img src={'http://localhost:8080/thumbnails/iYPH172GOXHb.jpeg'} />*/}
                {/*<img src={'http://localhost:8080/thumbnails/iYPH172GOXHb.jpeg'} />*/}
                {/*<img src={'http://localhost:8080/thumbnails/iYPH172GOXHb.jpeg'} />*/}
                {/*<img src={'http://localhost:8080/thumbnails/iYPH172GOXHb.jpeg'} />*/}
                {/*<img src={'http://localhost:8080/thumbnails/iYPH172GOXHb.jpeg'} />*/}
                {/*<img src={'http://localhost:8080/thumbnails/iYPH172GOXHb.jpeg'} />*/}
                {/*</div>*/}
                {/*</div>*/}

                {/* 상품정보 */}
                <div className='container-goods'>
                    <div className='share'>
                        <FontAwesomeIcon icon={faShareAlt} color={'white'} size={'2x'}/>
                    </div>
                    <h4>{goodsNm}</h4>
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

                    <div className='sharp-tag'>
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
                            <td className='title'>생산자</td>
                            <td>{name}</td>
                            <td className='title'>생산지</td>
                            <td>{farmName}</td>
                        </tr>
                        <tr>
                            <td className='title'>품목</td>
                            <td>{itemNm}</td>
                            <td className='title'>품종</td>
                            <td>{breedNm}</td>
                        </tr>
                        <tr>
                            <td className='title'>재배방법</td>
                            <td>{cultivationNm}</td>
                            <td className='title'>농약유무</td>
                            <td>{pesticideYn}</td>
                        </tr>
                        <tr>
                            <td className='title'>포장단위</td>
                            <td>{packUnit}</td>
                            <td className='title'>배송방법</td>
                            <td>택배</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className='title'>생산시작</td>
                            <td colSpan={2}>{ComUtil.utcToString(productionStart)} ~ </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className='title'>출하기간(예상)</td>
                            <td colSpan={2}>{ComUtil.utcToString(expectShippingStart)}</td>
                        </tr>
                        </tbody>
                    </table>
                </Container>
                <br/>

                <TabSection items={tabSectionData} activeIndex={0}/>



                {/* 상품설명 */}
                <div className='container-goods-detail'>
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
                <div className='container-goods-purcase-info'>
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
                <div className='container-goods-farm-diary'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ultrices sagittis orci a scelerisque. Morbi tristique
                </div>

                <TabSection items={tabSectionData} activeIndex={3}/>

                { /* 후기 */ }
                <div className='container-goods-review'>
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
                <div className='buy'>
                    <div><Button color='info' block>장바구니</Button></div>
                    <div><Button color='warning' block onClick={this.onBuyClick}>즉시구매</Button></div>
                </div>
            </Fragment>
        )
    }
}