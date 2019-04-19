import React, { Component } from 'react'

import GoodsDetail from '../../common/goodsDetail'
import { ShopXButtonNav, ShopOnlyXButtonNav } from '../../common'

export default class Goods extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        window.scrollTo(0,0)
    }

    render() {

        const search = this.props.location.search
        const params = new URLSearchParams(search)
        const goodsNo = params.get('goodsNo')

        return(
            <div>
                {/*<ShopXButtonNav history={this.props.history}>상품목록</ShopXButtonNav>*/}
                {/*<ShopXButtonNav close history={this.props.history}>상품목록</ShopXButtonNav>*/}
                <ShopOnlyXButtonNav back history={this.props.history}/>
                <GoodsDetail goodsNo={goodsNo} history={this.props.history}/>
            </div>
        )
    }
}