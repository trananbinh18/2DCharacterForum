import React, { Component } from 'react';
import { Route,Switch,Redirect } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import {CreateCharacter} from './components/CreateCharacter'
import {Login} from './components/Login'
import {Register} from './components/Register'
import {isUserLogin,deleteUserCookie,isHaveRoleAdmin} from './CheckUserService'
import {CharacterDetail} from './components/CharacterDetail'

export default class App extends Component {
  static displayName = App.name;
  
  constructor(props){
    super(props)

    this.state = {
      isLogin:isUserLogin(),
      isHaveRoleAdmin: false
    }
    this.changeLoginStatus = this.changeLoginStatus.bind(this);
  }

  componentDidMount(){
    console.log("this a mouth")
    isHaveRoleAdmin().then(data =>{
      this.setState({isHaveRoleAdmin: data})


    })
  }

  changeLoginStatus(status,isHaveRoleAdmin){
    if(!status){
      deleteUserCookie()
    }
    this.setState({isLogin: status})
    this.setState({isHaveRoleAdmin: isHaveRoleAdmin})
  }

  render () {
    return (
      <Layout logout={this.changeLoginStatus} isLogin={this.state.isLogin} isHaveRoleAdmin={this.state.isHaveRoleAdmin}>
        <Switch>
        <Redirect from="/" exact to="/home" />
        <Route  path='/home/:id?' component={Home} />
        <Route path='/create-character' component={CreateCharacter} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/login'  render={(routerProps)=> (
          <Login {...routerProps} login={this.changeLoginStatus} />
          
        )}/>
        <Route path='/register'  render={(routerProps)=> (
          <Register {...routerProps} login={this.changeLoginStatus} />
        )}/>
        
        <Route path='/character-detail/:id' component={CharacterDetail}/>
         
        </Switch>
      </Layout>
    );
  }
}
