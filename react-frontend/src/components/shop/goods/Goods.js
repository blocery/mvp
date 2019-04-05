import React, { Component } from 'react'

import GoodsDetail from '../../common/goodsDetail'

export default class Goods extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
    }

    render() {

        const search = this.props.location.search
        const params = new URLSearchParams(search)
        const goodsNo = params.get('goodsNo')

        return(
            <GoodsDetail goodsNo={goodsNo} history={this.props.history}/>
        )
    }
}