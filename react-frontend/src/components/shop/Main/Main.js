import React, { Component, Fragment } from 'react';
import { Header } from '../Header'
import { MainCategory } from '../MainCategories'
import './Card.scss'
import queryString from 'querystring'

import { Route, Switch, Redirect } from 'react-router-dom'

import Goods from '../../common/goodsDetail'

import { Recommend } from '../Recommend'
import { Resv } from '../Resv'
import { FarmDiary } from '../FarmDiary'



export default class Main extends Component {
    constructor(props) {
        super(props)

    }

    getContentPage = () => {
        const search = this.props.location.search
        const params = new URLSearchParams(search)
        const goodsNo = params.get('goodsNo')

        console.log(goodsNo)


        // goodsNo 가 있을경우
        if(goodsNo) return <Goods goodsNo={goodsNo} history={this.props.history}/>

        else{
            const id = this.props.match.params.id
            if(id === 'recommend') return <Recommend history={this.props.history}/>
            if(id === 'resv') return <Resv history={this.props.history}/>
            if(id === 'farmDiary') return <FarmDiary history={this.props.history}/>
        }

    }

    render() {
        const contentPage = this.getContentPage()

        return(
            <div>
                <Header/>
                <MainCategory/>
                {
                    contentPage
                }
            </div>
        )
    }
}
