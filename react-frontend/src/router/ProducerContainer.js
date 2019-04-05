import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'


import * as Producer from '../components/producer'

class ProducerContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Switch>
                <Route path='/producer/join' component={Producer.ProducerJoin} />
                <Route path='/producer/goodsReg' component={Producer.GoodsReg} />
            </Switch>
        )
    }
}

export default ProducerContainer