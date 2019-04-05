import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'


import ShopContainer from './ShopContainer'
import AdminContainer from './AdminContainer'
import ProducerContainer from './ProducerContainer'
import SampleContainer from './SampleContainer'
import Errot from '../components/Error'



class index extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Router>

                <div>

                    <Switch>
                        {/*<Route exact path={"/"} render={() => (<Redirect to="/main" />)} />*/}
                        <Route path={'/admin'} component={AdminContainer} />
                        <Route path={'/producer'} component={ProducerContainer}/>
                        <Route path={'/sample'} component={SampleContainer}/>
                        <Route path={'/'} component={ShopContainer} />
                        <Route component={Error}/>
                    </Switch>
                </div>
            </Router>

        )
    }
}

export default index