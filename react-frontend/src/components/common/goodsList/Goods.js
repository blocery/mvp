import React, { Component, Fragment } from 'react';
import ComUtil from '../../../util/ComUtil';
import event from '../../../images/event3.png'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'

const style = {
    image: {
        width: '100%',
        height: '170px'
    }
}

export default class Goods extends Component {
    constructor(props) {
        super(props);

    }

    onClick = (e) => {
        this.props.onClick(this.props.goods)
    }

    render() {
        return(
            <Fragment>
            <Row>
                <Col style={{ padding:0 }} onClick={this.onClick}>
                    <Row>
                        <Col style={{ paddingLeft: 0, paddingRight: 0 }}><img src={event} style={style.image} /></Col>
                    </Row>
                    <p></p>
                    <Row>
                        <Col><h5>{this.props.goods.goodsNm}&nbsp;{this.props.goods.packUnit}</h5></Col>
                    </Row>
                    <Row>
                        <Col><h4><i className={'text-info'}>50%</i>&nbsp;{ComUtil.addCommas(this.props.goods.reservationPrice)}원</h4></Col>
                        <Col className={'text-right text-danger'}></Col>
                    </Row>
                    <Row>
                        <Col>
                            <h6>예약특가 남은시간 38:30</h6>
                        </Col>
                        <Col className={'text-right'}>{ComUtil.utcToString(this.props.goods.expectShippingStart)} 이후 배송시작</Col>
                    </Row>
                    {/*<Row>*/}
                        {/*<Col style={{ paddingLeft: 0, paddingRight: 0 }}><hr /></Col>*/}
                    {/*</Row>*/}
                </Col>
            </Row>
                <br />
            </Fragment>
        )
    }
}




/*===== bad ======

GoodsList.js

import Goods from './Goods'

const dt = [{}{}{}{}{}{}{}...]

render(){
    {
        dt.map((goods)=>{
            <Goods goods={goods}/>
        })
    }
}

goods.js

const goods = this.props.goods

render(){

    <Row>goods.goodsName</Row>

}

============= good ============
-------------------------------------------
GoodsList.js

import Goods from './Goods'

const dt = [{}{}{}{}{}{}{}...]

render(){
    <Goods goodsList={dt}/>
}
--------------------------------------------
goods.js

const goodsList = this.props.goodsList

render(){
    {
        goodsList.map((goods)=>{
            <Row>goods.goodsName</Row>
        })
    }
}

*/
