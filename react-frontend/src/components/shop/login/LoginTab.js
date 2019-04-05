import React, { Component } from 'react'
import axios from 'axios'
import { Server } from '../../Properties';
import { Container, InputGroup, InputGroupAddon, InputGroupText, Input, Form, Row, Col, FormGroup, Label, Button, Fade } from 'reactstrap'
import { Link } from 'react-router-dom'
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap'
import classnames from 'classnames'

//Tab제목
const TabTitle = (props) => {
    if (props.tabNumber === '1') { //소비자 Tab
        if (props.activeTab === '1') {
            return (
                <h5> <span style={{color: 'red'}}> 소비자 로그인 </span> </h5>
            );
        } else {                   //생산자 Tab
            return (
                <h5> 소비자 로그인 </h5>
            );
        }
    }
    else {
        if (props.activeTab === '2') {
            return (
                <h5> <span style={{color: 'red'}}> 생산자 로그인 </span> </h5>
            );
        } else {
            return (
                <h5> 생산자 로그인 </h5>
            );
        }
    }
}

//(소비자 or 생산자) 회원가입
const JoinTitle = (props) => {
    if (props.activeTab === '1') { //소비자 Tab
        return (
            <Button color='link' onClick={props.onClick}>
                <small> <span style={{fontWeight:'bold'}}>소비자 회원가입 </span> </small>
            </Button>
        );
    } else {                       //생산자 Tab
        return (
            <Button color='link' onClick={props.onClick}>
                <small> <span style={{fontWeight:'bold'}}>생산자 회원가입</span> </small>
            </Button>
        );
    }
}

/**
 *  소비자 로그인 / 생산자 로그인 탭 및 화면 - 공통 사용
 */

export default class LoginTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1', //소비자탭='1', 생산자탭='2'
            fadeEmail: false, //email 미입력시 에러메시지 여부
            fadeEmailType: false,
            fadePassword: false,
            fadeError: false   //email or pw 가 서버에 없을때 에러메시지 여부
        }
    }

    componentDidMount(){
        //this.storage.getItem('email') && this.props.history.push('/')
    }

    onLoginClicked = (event) => {
        event.preventDefault();
        //this.storage.setItem('email', 'blocery@ezfarm.co.kr')

        //Fade All reset
        this.setState({
            fadeEmail: false, fadePassword:false, fadeEmailType:false, fadeError:false
        });

        //input ERROR check
        let data = {};
        data.email = event.target[0].value;
        data.valword = event.target[1].value;

        if (!data.email) {
            this.setState({fadeEmail: true});
            return;
        }

        const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (!emailRule.test(data.email)) {
            this.setState({fadeEmailType: true});
            return;
        }

        if (!data.valword) {
            this.setState({fadePassword: true});
            return;
        }

        //login CALL
        data.userType = (this.state.activeTab === '1')? 'consumer': 'producer';

        axios(Server.getRestAPIHost() + '/login',
            {
                method: "post",
                data:data,
                withCredentials: true,
                credentials: 'same-origin'
            })
            .then((response) => {
                console.log(response);
                if (response.data.status === Server.ERROR)             //100: login ERROR
                    this.setState({fadeError: true});
                else
                {
                    let loginInfo = response.data;

                    //쿠키(localStorage)에 login된 userType저장. - 필요하려나.
                    localStorage.setItem('loginUserType', loginInfo.userType);
                    localStorage.setItem('account', loginInfo.account); //geth Account

                    console.log('loginInfo : ===========================',loginInfo)

                    //TODO webView2를 닫는 방식 필요.
                    this.props.history.push('/'); //임시로 메인으로 이동
                    //window.location = this.targetLocation;  //LeftBar등이 초기화됨
                }
            })
            .catch(function (error) {
                console.log(error);
                alert('로그인 오류:'+error);
            });


        //this.props.history.push('/')
    }

    //아이디 찾기
    onIdSearchClick = () => {
        console.log('not implemented');
    }

    //비밀번호 찾기
    onPwSearchClick = () => {
        console.log('not implemented');
    }

    onJoinClick = () => {
        console.log(this.state.activeTab);

        if (this.state.activeTab === '1')   //소비자탭
            this.props.history.push('/join');
        else                                //생산자탭
            this.props.history.push('/producer/join');
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render(){
        return(
            <Container fluid>
                <p></p>
                <h3 className={'text-center'}>
                    <Link to='/'> 로그인 </Link>
                </h3>
                <hr className="my-2" align={'center'}/> {/* gray line */}

                <p></p>
                <p className={'text-center'}> 소비자 및 생산자 선택 후 로그인 해주시기 바랍니다 </p>
                <Form onSubmit={this.onLoginClicked}>
                    <Row> {/* Tab */}
                        <Col sm={"12"}>
                            <br/>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}
                                    >
                                        <TabTitle tabNumber='1' activeTab={this.state.activeTab}/>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}
                                    >
                                        <TabTitle tabNumber='2' activeTab={this.state.activeTab}/>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                        </Col>
                    </Row>
                    <Row> {/* blank line */}
                        <br/>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                                    <Input placeholder="아이디(이메일)" />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col xs={12}>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">비번</InputGroupAddon>
                                    <Input type="password" placeholder="비밀번호" />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}> {/* 잘못입력 및 로그인 실패시 에러 메시지 */}
                            {
                                this.state.fadeEmail && <Fade in={true} style={{color:'red'}}>이메일 주소를 입력해 주세요.</Fade>
                            }
                            {
                                this.state.fadeEmailType && <Fade in={true} style={{color:'red'}}>이메일 주소를 양식에 맞게 입력해 주세요.</Fade>
                            }
                            {
                                this.state.fadePassword && <Fade in={true} style={{color:'red'}}>비밀번호를 입력해 주세요.</Fade>
                            }
                            {
                                this.state.fadeError && <Fade in={true} style={{color:'red'}}>아이디/비밀번호를 확인해 주세요.</Fade>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <FormGroup check> {/* TODO */}

                                <Input type="checkbox" name="check" id="autoLogin"/>
                                <Label for="autoLogin" check> 자동로그인 </Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <FormGroup>
                                <Button type='submit' color={'info'} block >로그인</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                    <hr className="my-2" align={'center'}/> {/* gray line */}
                    <br/>
                    <Row>
                        <Col xs={0.5}/>
                        <Col xs={3} className={'text-center'}>
                            <FormGroup>
                                <Button color={'link'} onClick={this.onIdSearchClick}>
                                    <small>아이디 찾기</small>
                                </Button>
                            </FormGroup>
                        </Col>
                        <Col xs={1}/>
                        <Col xs={3} className={'text-center'}>
                            <FormGroup>
                                <Button color={'link'} onClick={this.onPwSearchClick}>
                                    <small>비밀번호 찾기</small>
                                </Button>
                            </FormGroup>
                        </Col>
                        <Col xs={1}/>
                        <Col xs={3} className={'text-center'}>
                            <FormGroup>
                                <JoinTitle activeTab = {this.state.activeTab} onClick={this.onJoinClick}/>
                            </FormGroup>
                        </Col>
                        <Col xs={0.5}/>
                    </Row>
                </Form>
            </Container>
        )
    }
}




