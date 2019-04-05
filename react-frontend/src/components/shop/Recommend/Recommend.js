import React, { Component, Fragment } from 'react';
// import './Card.scss'

import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import event from '../../../images/event.png'
import event2 from '../../../images/event2.png'
import farmDiary from '../../../images/farmDiary.jpg'
import VirtualList from 'react-tiny-virtual-list';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarrot, faAppleAlt, faCartPlus, faCartArrowDown, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { MdCategory } from '../MdCategory'

const style = {
    image: {
        width: '100%',
        height: '170px'
    }
}



const sectionStyle = {
    width: "100%",
    height: "400px",
    backgroundImage: `url(${farmDiary})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    paddingLeft: '20px',
    paddingTop: '300px'

}

export default class Recommend extends Component{
    constructor(props) {
        super(props);
    }

    //[onClick] MD 카테고리 클릭
    onMdCategoryClicked = (props) =>{
        console.log(props)
    }

    movePage = () => {

        //this.props.history.push('/main/recommend/goodsNo')
        const pathName = this.props.history.location.pathname
        console.log('pathname:', pathName)
        this.props.history.push(`${pathName}?goodsNo=100&productNo=999`)
        //this.props.history.push('/')


    }
    render(){
        return(
            <Container>
                <br/>
                <Row>
                    <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <img src={event} style={style.image} onClick={this.movePage} />
                    </Col>
                </Row>


                {/*<VirtualList*/}
                {/*scrollDirection={'horizontal'}*/}
                {/*height={60}*/}
                {/*itemCount={mdCategories.length}*/}
                {/*itemSize={100}*/}
                {/*style={{borderBottom: '1px solid #dbdbdb'}}*/}
                {/*renderItem={({ index, style }) =>*/}
                {/*<div key={index} className={'text-center'} style={style}>*/}
                {/*<div><FontAwesomeIcon icon={faCarrot} size='lg' /></div>*/}
                {/*<small>*/}
                {/*{*/}
                {/*mdCategories[index]*/}
                {/*}*/}
                {/*</small>*/}
                {/*</div>*/}
                {/*}*/}
                {/*/>*/}
                <br/>
                <h6 className={'text-secondary'}>농부가 정성으로 재배중인 프리미엄 농산물</h6>
                <MdCategory onClick={this.onMdCategoryClicked} />

                <br/>
                <h6 className={'text-secondary'}>오늘의 파격할인 예약상품</h6>
                <Row>
                    <Col>
                        <Row>
                            <Col style={{ paddingLeft: 0, paddingRight: 0 }}><img src={event2} style={style.image} /></Col>
                        </Row>
                        <p></p>
                        <Row>
                            <Col><h6>합천 프리미엄 고구마 2kg</h6></Col>
                            <Col className={'text-right'}><FontAwesomeIcon icon={faCartPlus} color={'#1697ae'} size={'lg'}/></Col>
                        </Row>
                        <Row>
                            <Col><h4><i className={'text-info'}>50%</i> 6,000원</h4></Col>
                            <Col className={'text-right text-danger'}>
                                <FontAwesomeIcon icon={faStar} color={'#1697ae'} size={'lg'}/>
                                <FontAwesomeIcon icon={faStar} color={'#1697ae'} size={'lg'}/>
                                <FontAwesomeIcon icon={faStar} color={'#1697ae'} size={'lg'}/>
                                <FontAwesomeIcon icon={faStar} color={'#1697ae'} size={'lg'}/>
                                <FontAwesomeIcon icon={faStar} color={'#88c4d8'} size={'lg'}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h6>예약특가 남은시간 38:30</h6>
                            </Col>
                            <Col className={'text-right'}>3/2(토) 이후 배송시작</Col>
                        </Row>

                    </Col>
                </Row>

                {/* ========= 생산일지 Start ========= */}
                <br/>
                <Row>
                    <Col className={'text-secondary'}>
                        <h6 className={'text-secondary'}>이번주 생산일지</h6>
                    </Col>
                </Row>
                <Row>
                    <Col style={{ paddingLeft: 0, paddingRight: 0 }} className={'text-white'}>
                        <div style={sectionStyle} >
                            <div style={{opacity: 0.8}}>
                                <h3>
                                    무농약 자색 고구마 수확중!!
                                </h3>
                                <h6>#기다린 보람 #자색고구마 #당도높은 #군고구마</h6>
                            </div>

                        </div>
                        {/*<img src={farmDiary} style={{width:'100%'}} />*/}
                    </Col>
                </Row>
                <Row>
                    <Col>

                    </Col>
                </Row>
                {/* ========= 생산일지 End ========= */}
            </Container>
        )
    }
}
