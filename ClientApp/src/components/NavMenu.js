import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import {isUserLogin,getCurrentUser} from '../CheckUserService';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };

  }

  

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    
    console.log("Rerender",this.state)
    let isLogin = this.props.isLogin
    let button
    if(isLogin){
      let isHaveRoleAdmin = this.props.isHaveRoleAdmin
      console.log("isHaveRoleAdmin",isHaveRoleAdmin)
      let specialButton;
      if(isHaveRoleAdmin){
        specialButton = (
          <NavItem>
              <NavLink tag={Link} className="text-dark" to="/create-character">Create Character</NavLink>
          </NavItem>
        )
      }

      button = (
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand className="animated infinite tada delay-2s" tag={Link} to="/">Character Log</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                {specialButton}
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                </NavItem>
                <div>
                  <h6>Hello {getCurrentUser()["userName"]}</h6>
                  <button onClick={()=> this.props.logout(false,false)}>Logout</button>
                  {this.props.isLogin}
                </div>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
        
      )
    }
    else{
      button =  
      (
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand className="animated infinite tada delay-2s" tag={Link} to="/">Character Log</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                  {this.props.isLogin}
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
        
      )
    }

    return (
      <header>
        {button}
      </header>
    );
  }
}
