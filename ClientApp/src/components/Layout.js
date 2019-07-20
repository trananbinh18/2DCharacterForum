import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    console.log("prps ne",this.props)
    return (
      <div>
        <NavMenu logout={this.props.logout} isLogin={this.props.isLogin} isHaveRoleAdmin={this.props.isHaveRoleAdmin} />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
