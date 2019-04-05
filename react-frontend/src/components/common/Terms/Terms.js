import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input, Container, InputGroup, Row, InputGroupAddon, Collapse, Card, CardBody, Fade } from 'reactstrap'

export default class Terms extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    // 약관 전체동의 check/uncheck
    onChangeCheckAll = (e) => {
        this.setState({
            checkbox1: e.target.checked,
            checkbox2: e.target.checked
        })
    }

    handleCheckbox = (e) => {
        this.setState({
            [e.target.name]: e.target.checked
        })
    }

    // 약관 전체보기 클릭
    toggle = (e) => {
        if(e == 1) {
            this.setState(state => ({
                termsCollapse: !state.termsCollapse
            }))
        } else {
            this.setState(state => ({
                personalInfoCollapse: !state.personalInfoCollapse
            }))
        }
    }

    render() {
        return (
            <Form>
                <Row>
                    <Col>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="checkAll" checked={this.state.checkbox1 && this.state.checkbox2 ? true: false} value="checkAll" onChange={this.onChangeCheckAll} />{' '}
                                <h6>전체 동의{' '}</h6>
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="checkbox1" checked={this.state.checkbox1} onChange={this.handleCheckbox} />{' '}
                                <h6>이용 약관{' '}<span style={{color:'red'}}>(필수)</span><Button color="link" onClick={this.toggle.bind(this, 1)}>전체보기</Button></h6>
                                <Collapse isOpen={this.state.termsCollapse}>
                                    <Card>
                                        <CardBody>
                                            이용약관내용 들어갑니다.이용약관내용 들어갑니다.이용약관내용 들어갑니다.이용약관내용 들어갑니다.이용약관내용 들어갑니다.
                                            이용약관내용 들어갑니다.이용약관내용 들어갑니다.이용약관내용 들어갑니다.이용약관내용 들어갑니다.
                                            이용약관내용 들어갑니다.이용약관내용 들어갑니다.이용약관내용 들어갑니다.
                                            이용약관내용 들어갑니다.이용약관내용 들어갑니다.
                                            이용약관내용 들어갑니다.
                                        </CardBody>
                                    </Card>
                                </Collapse>
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="checkbox2" checked={this.state.checkbox2} onChange={this.handleCheckbox} />{' '}
                                <h6>개인정보 취급방침{' '}<span style={{color:'red'}}>(필수)</span><Button color="link" onClick={this.toggle.bind(this, 2)}>전체보기</Button></h6>
                                <Collapse isOpen={this.state.personalInfoCollapse}>
                                    <Card>
                                        <CardBody>
                                            개인정보 취급방침 내용 들어갑니다.개인정보 취급방침 내용 들어갑니다.개인정보 취급방침 내용 들어갑니다.
                                            개인정보 취급방침 내용 들어갑니다.개인정보 취급방침 내용 들어갑니다.
                                            개인정보 취급방침 내용 들어갑니다.개인정보 취급방침 내용 들어갑니다.
                                        </CardBody>
                                    </Card>
                                </Collapse>
                            </Label>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        )
    }
}