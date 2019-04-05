import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Container, NavbarToggler, UncontrolledDropdown, Collapse, DropdownToggle, DropdownMenu, Dropdown, DropdownItem, Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faCarrot, faAppleAlt, faCartPlus, faCartArrowDown, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'

import { observer, inject } from 'mobx-react';


@inject('HeaderStore')
@observer
class Header extends Component{
    constructor(props) {
        super(props);

        console.log('header props:',props)
        this.state = {
            isOpen: false,
            //displayName: this.props.displayName,
            userType: 'consumer' // 'producer'
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        //this.props.getLoginUser();
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    logout = () => {
        if(window.confirm('로그아웃 하시겠습니까?')){
            localStorage.clear();
            this.props.logout();
        }
    }

    render(){

        return(

            <Navbar color="info" dark expand="sm" sticky="top" className={'shadow-none'}>
                {/*<NavbarToggler onClick={this.toggle} />*/}
                <NavbarBrand tag={Link} to={'/'} >
                    <h6>Blocery</h6>
                </NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to={'/login'} ><FontAwesomeIcon icon={faShoppingCart} size={'sm'}/></NavLink>
                    </NavItem>

                    <NavItem>

                        <Dropdown direction='left' size='sm' isOpen={this.state.isOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                Sample
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    <NavLink className={'text-info'} tag={Link} to={'/sample/mobx'} >mobx</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className={'text-info'} tag={Link} to={'/sample/ImageCompressor'} >이미지업로드(압축)</NavLink>
                                </DropdownItem>
                                <DropdownItem>
                                    <NavLink className={'text-info'} tag={Link} to={'/sample/SimpleStorageTest'} >SimpleStorageTest</NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavItem>
                </Nav>
            </Navbar>










        );
    }
}

export default Header