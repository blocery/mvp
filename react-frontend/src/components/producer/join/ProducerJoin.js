import React, { Component, Fragment } from 'react';
import { Col, Button, Form, FormGroup, Label, Input} from 'reactstrap'
import axios from 'axios'
import { Server } from '../../Properties'

export default class ProducerJoin extends Component{

    constructor(props) {
        super(props);

        // this.formValidation = this.formValidation.bind(this);
    }

    componentWillMount() {
        //this.MTokenGethSC = new MTokenGethSC();
        //this.MTokenGethSC.initContract('/MTokenSC.json');
    }

    formValidation = (event) => {
        event.preventDefault();

        let data = {};
        data.email = event.target[0].value;
        data.password = event.target[1].value;
        let passwordConfirm = event.target[2].value;
        data.company = event.target[3].value;
        data.name = event.target[4].value;
        data.phone = event.target[5].value;
        data.passPhrase = event.target[6].value;

        if (data.email === ''){
            alert('이메일을 입력해 주세요');
            return false;
        }
        if (data.password === ''){
            alert('비밀번호를 8자리 입력해주세요');
            return false;
        }
        if (data.password !== passwordConfirm) {
            alert('비밀번호와 비밀번호 확인값이 다릅니다');
            return false;
        }

        if (data.company === ''){
            alert('회사명을 입력해주세요');
            return false;
        }
        if (data.name === ''){
            alert('대표자명을 입력해주세요');
            return false;
        }
        if (data.phone === ''){
            alert('전화번호를 입력해주세요');
            return false;
        }
        if (data.passPhrase === '' || (data.passPhrase && data.passPhrase.length !== 6)) {
            //TODO 숫자만 허용로직 + 결제비번 확인기능 필요
            alert('결제비밀번호 숫자 6자리를 입력해주세요');
            return false;
        }

        //Backend 가입
        axios(Server.getRestAPIHost() + '/producer',
            {
                method: "post",
                data:data,
                withCredentials: true,
                credentials: 'same-origin'
            })
            .then((response) => {
                // alert(JSON.stringify(response));  //response출력
                if (response.data === 100)
                    alert('가입 오류입니다.');
                else {
                    // this.MTokenGethSC.initProducerEthToken(response.data).then((response) => {
                    //     console.log(response);
                    //     if(response === 200) {
                            alert('가입성공!');
                            window.location = '/producerLogin';  //가입성공
                    //     }
                    // });
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render(){
        return(
            <Fragment>
                생산자 가입
                <Form onSubmit={this.formValidation}>
                    <br/><br/>
                    <FormGroup row>
                        <Label for="email" sm={{ size: 2, offset: 1 }}> 이메일 ID </Label>
                        <Col sm={4}>
                            <Input type="text" name="email" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="password" sm={{ size: 2, offset: 1 }}> 비밀번호(8자리) </Label>
                        <Col sm={4}>
                            <Input type="password" name="password"  />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="passwordConfirm" sm={{ size: 2, offset: 1 }}> 비밀번호 확인</Label>
                        <Col sm={4}>
                            <Input type="password" name="passwordConfirm"  />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="company" sm={{ size: 2, offset: 1 }}> 업체명 </Label>
                        <Col sm={4}>
                            <Input type="text" name="company"  />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="name" sm={{ size: 2, offset: 1 }}> 대표자 </Label>
                        <Col sm={4}>
                            <Input type="text" name="name"  />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="phone" sm={{ size: 2, offset: 1 }}> 전화번호 </Label>
                        <Col sm={4}>
                            <Input type="text" name="phone"  />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="passPhrase" sm={{ size: 2, offset: 1 }}> 결제비밀번호 </Label>
                        <Col sm={4}>
                            <Input type="text" size="6" name="passPhrase"  />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <Button type='submit' color='primary' style={{ width:150 }} > 가 입 </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}