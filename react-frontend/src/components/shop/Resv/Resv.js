import React, { Component, Fragment } from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem, Button } from 'reactstrap'

import GoodsList from '../../common/goodsList';

import { getGoods } from '../../../lib/goodsApi'

const style = {
    image: {
        width: '100%',
        height: '170px'
    }
}
export default class Resv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: []
        }
        // this.state = {
        //     filter: '01'
        // }
    }

    componentDidMount() {
        this.search()
    }

    search = async () => {
        const response = await getGoods()
        this.setState({rowData: response.data})

    }

    // filter = () => {
    //     this.setState({
    //         filter: '02'
    //     })
    // }

    onGoodsClicked = (props) => {
        console.log(props)
        this.movePage(props)
    }

    movePage = ({goodsNo}) => {
        const pathName = this.props.history.location.pathname
        this.props.history.push(`${pathName}?goodsNo=${goodsNo}`)
    }

    render() {
        return(
            <Container>
                <br/>
                <h6 className={'text-secondary'}>Best 예약상품</h6>
                    <GoodsList data={this.state.rowData} onGoodsClicked={this.onGoodsClicked} />
            </Container>
        )
    }
}
