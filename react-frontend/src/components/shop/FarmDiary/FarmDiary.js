import React, { Component, Fragment } from 'react'
import { FarmDiaryGallery, Spinner, Sorter } from '../../common'
import {Container, Row, Col} from 'reactstrap'
import { getFarmDiary } from '../../../lib/producerApi'

export default class FarmDiary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loading: true
        }
    }
    componentDidMount(){
        this.search()
    }
    search = async () => {

        this.setState({
            loading: true
        })

        const data = await getFarmDiary()
        alert()
        console.log('data',data)
        this.setState({
            loading: false,
            data: data
        })
    }
    onImageClicked = (item) => {
        console.log(item)
    }
    render() {
        const sorterData = [{cd: '01', nm: '최신등록순'}, {cd: '02', nm: '최신등록순2'},{cd: '03', nm: '최신등록순3'}]
        return(
            <Container>
                <br/>
                <h6 className={'text-secondary'}>내가 예약한 농산물 재배현황</h6>
                <Row>
                    <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                            {/*<Sorter data={sorterData}/>*/}
                            {
                                this.state.loading && <Spinner/>
                            }
                            <FarmDiaryGallery
                                data={this.state.data}
                                onImageClicked={this.onImageClicked}
                            />
                    </Col>
                </Row>
                <br/>
                <h6 className={'text-secondary'}>최신등록순</h6>
                <Row>
                    <Col style={{ paddingLeft: 0, paddingRight: 0 }}>
                        {/*<Sorter data={sorterData}/>*/}
                        {
                            this.state.loading && <Spinner/>
                        }
                        <FarmDiaryGallery
                            data={this.state.data}
                            onImageClicked={this.onImageClicked}
                        />
                    </Col>
                </Row>


            </Container>
        )
    }
}
