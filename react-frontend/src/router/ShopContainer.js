import React, { Component, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import TopBar from '../components/shop/Header/Header'
import { LoginTab, Main, Goods, Buy } from '../components/shop'
import Error from '../components/Error'

class ConsumerContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Fragment>
                <Switch>
                    <Route path='/login' component={LoginTab}/>
                    <Route exact path='/' render={()=>(<Redirect to={'/main/recommend'}/>)} />
                    <Route path={'/main/:id'} component={Main} />
                    <Route path={'/goods'} component={Goods}/>
                    <Route path={'/buy'} component={Buy}/>
                    {/*<Route path={'/main/recommend'} component={Main} />*/}
                    {/*<Route path={'/main/resv'} component={Main} />*/}
                    <Route component={Error}/>
                </Switch>
            </Fragment>
        )
    }
}

export default ConsumerContainer
