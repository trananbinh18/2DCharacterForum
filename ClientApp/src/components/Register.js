import React, { Component } from 'react';
import PropTypes from "prop-types";
import { userInfo } from 'os';
import {isHaveRoleAdmin} from "../CheckUserService"


export class Register extends Component {

//   static contextTypes = {
//     router: PropTypes.object
//   }

  constructor(props){
    super(props)
    
    this.state = {
      ErrorMessage:""
    }

  }

  componentDidMount(){

  }

  submitRegister(e){
    e.preventDefault()

    let email = document.getElementById("Email").value
    let password = document.getElementById("Password").value
    let username = document.getElementById("UserName").value

    let dataOk = false;


    var data = new FormData()
    data.append("Email",email)
    data.append("Password",password)
    data.append("UserName",username)


    fetch('./Account/Register', {
        method: 'post',
        body: data
    })
    .then(data => {
        dataOk = data.ok
        return data.json()
    })
    .then(data => {    
        if(dataOk){
            this.setState({ErrorMessage:""})
            document.cookie = "currentuser="+JSON.stringify(data)

            alert("Register Success!!")
            this.props.history.push("/");
            this.props.login(true,true);

        }else{
            this.setState({ErrorMessage:data.message})
        }
      

    })
  }
  

  render () {

    return (
      <div className="login-container">
          <h4>Register Account</h4>
        
       <form method="post" enctype="multipart/form-data">

       <div class="error-message">
           {this.state.ErrorMessage}
       </div>

            <div class="form-group">
                <label for="UserName">UserName</label>
                <input type="text" class="form-control" id="UserName" placeholder="Enter UserName"/>
            </div>
            

            <div class="form-group">
                <label for="Email">Email</label>
                <input type="text" class="form-control" id="Email" placeholder="Enter Email"/>
            </div>
            
            <div class="form-group">
                <label for="Password">Password</label>
                <input type="text" class="form-control" id="Password" placeholder="Enter Password"/>
            </div>

            <button onClick={(e)=>this.submitRegister(e)} type="submitLogin" class="btn btn-primary">Submit</button>

       </form>
      </div>
    );
  }
}
