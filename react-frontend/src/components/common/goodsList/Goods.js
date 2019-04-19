import React, { Component, Fragment } from 'react';
import ComUtil from '../../../util/ComUtil';
import event from '../../../images/event3.png'
import {Image} from '../../common'
import { Row, Col } from 'reactstrap'
import { Server } from '../../Properties'

import Style from './GoodsList.module.scss'
import TextStyle from '../../../styles/Text.module.scss'

const style = {
    image: {
        width: '100%',
        height: '100%'

        //width: '100%',
        //height: '100%'
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
        const goodsImage = this.props.goods.goodsImages[0] != undefined ? Server.getThumbnailURL()+this.props.goods.goodsImages[0].imageUrl : '';
        return(
            <Fragment>
                <div className={Style.wrap} onClick={this.onClick}>
                    <div className={Style.imageBox}>
                        <Image style={style.image} src={goodsImage} borderRadius={true}></Image>
                    </div>
                    <div className={Style.contentBox}>
                        <div className={TextStyle.textLarge}>
                            {this.props.goods.goodsNm} {this.props.goods.packAmount}{this.props.goods.packUnit}
                        </div>
                        <div className={TextStyle.textLarge}><i className={'text-info'}>50%</i>&nbsp;{ComUtil.addCommas(this.props.goods.reservationPrice)}원</div>
                        <div className={TextStyle.textMedium}>예약특가 남은시간 38:30</div>
                        <div className={TextStyle.textSmall}>{ComUtil.utcToString(this.props.goods.expectShippingStart)} 이후 배송시작</div>
                    </div>
                </div>
                <hr/>
                {/*<Row>*/}
                    {/*<Col xs={3} style={{padding: 0, margin:0}}>*/}
                        {/*<Image style={style.image} src={goodsImage}></Image>*/}
                    {/*</Col>*/}
                    {/*<Col xs={9}>*/}
                        {/*<div className={TextStyle.textLarge}>*/}
                            {/*{this.props.goods.goodsNm}{this.props.goods.packAmount}{this.props.goods.packUnit}*/}
                        {/*</div>*/}
                        {/*<div className={TextStyle.textLarge}><i className={'text-info'}>50%</i>&nbsp;{ComUtil.addCommas(this.props.goods.reservationPrice)}원</div>*/}
                        {/*<div className={TextStyle.textMedium}>예약특가 남은시간 38:30</div>*/}
                        {/*<div className={TextStyle.textSmall}>{ComUtil.utcToString(this.props.goods.expectShippingStart)} 이후 배송시작</div>*/}
                    {/*</Col>*/}
                {/*</Row>*/}
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
