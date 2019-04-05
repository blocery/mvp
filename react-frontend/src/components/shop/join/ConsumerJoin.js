import React, { Component, Fragment } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Container, InputGroup, Row, InputGroupAddon, Collapse, Card, CardBody, Fade } from 'reactstrap'
import axios from 'axios'
import { Server } from '../../Properties'

import { Link } from 'react-router-dom'
import Terms from '../../common/Terms/Terms'

export default class ConsumerJoin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            valword: '',
            name: '',
            passPhrase: '',
            termsCollapse: false,
            personalInfoCollapse: false,
            checkbox1: false,
            checkbox2: false,
            fadeEmail: false,
            fadeOverlapEmail: false,
            fadeValword: false,
            fadeValwordCheck: false,
            fadePassPhraseCheck: false
        };
    }

    // element의 값이 체인지될 때
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // email regex(정규식체크, DB에 존재여부 확인)
    emailCheck = (e) => {
        const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

        if (!emailRule.test(e.target.value)) {
            this.setState({ fadeEmail: true })
        } else {
            this.setState({ fadeEmail: false })
        }
        // db에 이미 있는 아이디인지 체크
        axios(Server.getRestAPIHost()+ '/findConsumerEmail',
            {
                method: "get",
                data:e.target.value,
                withCredentials: true,
                credentials: 'same-origin',
                params: {email: e.target.value}
            })
            .then((response) => {
                if (response.data == '' || response.data == null) {
                    this.setState({ fadeOverlapEmail: false })
                } else {
                    this.setState({ fadeOverlapEmail: true })
                }
            })
            .catch (function (error) {
                console.log(error);
            });
    }

    // valword regex
    valwordRegexCheck = (e) => {
        const valRule = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

        if (!valRule.test(e.target.value)) {
            this.setState({ fadeValword: true })
        } else {
            this.setState({ fadeValword: false })
        }
    }

    // 입력한 비밀번호와 일치하는지 체크
    valwordCheck = (e) => {
        if (e.target.value != this.state.valword) {
            this.setState({ fadeValwordCheck: true })
        } else {
            this.setState({ fadeValwordCheck: false })
        }
    }

    // 입력한 결제 비밀번호와 일치하는지 체크
    passPhraseCheck = (e) => {
        if(e.target.value != this.state.passPhrase) {
            this.setState({ fadePassPhraseCheck: true })
        } else {
            this.setState({ fadePassPhraseCheck: false })
        }
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

    // 약관 전체동의 check/uncheck
    onChangeCheckAll = (e) => {
        this.setState({
            checkbox1: e.target.checked,
            checkbox2: e.target.checked
        })
    }

    // 회원가입버튼 클릭
    onRegisterClick = () => {
        const state = Object.assign({}, this.state)

        if(state.email == '' || state.valword == '' || state.name == '' || state.fadeEmail || state.fadeOverlapEmail || state.fadeValword || state.fadeValwordCheck) {
            alert('필수항목 정보를 정확하게 입력해주세요.')
            return false;
        }
        if(state.passPhrase.length != 6 || state.fadePassPhraseCheck) {
            alert('결제 비밀번호를 정확하게 입력해주세요.')
            return false;
        }
        if(!state.checkbox1 || !state.checkbox2) {
            alert('약관 동의는 필수사항입니다.')
            return false;
        }

        axios(Server.getRestAPIHost() + '/consumer',
            {
                method: "post",
                data: state,
                withCredentials: true,
                credentials: 'same-origin'
            })
            .then((response)=>{
                if(response.data === 100) {
                    alert('가입 오류입니다. 잠시 후 다시 시도해주세요.');
                    return false;
                } else if(response.data === 101) {
                    alert('이미 등록된 아이디(이메일)입니다.');
                    return false;
                } else {
                    alert('가입이 정상처리되었습니다.')
                    window.location = '/login'
                }
            })
            .catch (function (error) {
                console.log(error);
            });
    }

    render(){
        return(
            <Container fluid>
                <p></p>
                <h1 className={'text-center'}>
                    <Link to='/'>Blocery</Link>
                </h1>
                <br />
                <Form>
                    <Row form>
                        <Col xs={12}>
                            <FormGroup>
                                <Label>아이디</Label>
                                <InputGroup>
                                    <Input name="email" value={this.state.email} placeholder="아이디(이메일)" onBlur={this.emailCheck} onChange={this.handleChange} />
                                </InputGroup>
                                {
                                    this.state.fadeEmail && <Fade in={true} style={{color:'red'}}>이메일 형식을 다시 확인해주세요.</Fade>
                                }
                                {
                                    this.state.fadeOverlapEmail && <Fade in={true} style={{color:'red'}}>이미 사용중인 이메일입니다.</Fade>
                                }
                            </FormGroup>
                        </Col>
                        <Col xs={12}>
                            <FormGroup>
                                <Label>비밀번호</Label>
                                <InputGroup>
                                    <Input type="password" name="valword" value={this.state.valword} placeholder="비밀번호" onBlur={this.valwordRegexCheck} onChange={this.handleChange} />
                                </InputGroup>
                                {
                                    this.state.fadeValword && <Fade in={true} style={{color:'red'}}>8~16자 영문 대 소문자 숫자 특수문자를 사용하세요.</Fade>
                                }
                            </FormGroup>
                        </Col>
                        <Col xs={12}>
                            <FormGroup>
                                <Label>비밀번호 확인</Label>
                                <InputGroup>
                                    <Input type="password" name="valwordCheck" placeholder="비밀번호 확인" onBlur={this.valwordCheck} onChange={this.handleChange} />
                                </InputGroup>
                                {
                                    this.state.fadeValwordCheck && <Fade in={true} style={{color:'red'}}>비밀번호가 일치하지 않습니다.</Fade>
                                }
                            </FormGroup>
                        </Col>
                        <Col xs={12}>
                            <FormGroup>
                                <Label>이름</Label>
                                <InputGroup>
                                    <Input name="name" value={this.state.name} placeholder="이름" onChange={this.handleChange} />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <h6>필수항목 정보를 정확하게 입력해주세요</h6>
                    <br />
                    <Row>
                        <Col xs={12}>
                            <FormGroup>
                                <InputGroup>
                                    <Input type="password" name="passPhrase" value={this.state.passPhrase} placeholder="결제 비밀번호(숫자6자리)" onChange={this.handleChange} maxLength="6" />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col xs={12}>
                            <FormGroup>
                                <InputGroup>
                                    <Input type="password" name="passPhraseCheck" placeholder="결제 비밀번호 확인" onBlur={this.passPhraseCheck} onChange={this.handleChange} maxLength="6" />
                                </InputGroup>
                                {
                                    this.state.fadePassPhraseCheck && <Fade in={true} style={{color:'red'}}>비밀번호가 일치하지 않습니다.</Fade>
                                }

                            </FormGroup>
                        </Col>
                    </Row>
                    <h6>상품 구매 시 사용할 결제 비밀번호를 숫자 6자리로 입력하세요</h6>
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
                    <Row form>
                        <Col xs={12}>
                            <FormGroup>
                                <Button block color={'info'} onClick={this.onRegisterClick}>회원가입</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                {/*<Terms/>*/}
            </Container>

        );
    }
}