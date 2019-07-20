import React, { Component } from 'react';
import './CommentBox.css'
import {getCookie,isUserLogin} from '../CheckUserService'
import {HubConnectionBuilder} from '@aspnet/signalr'

export class CommentBox extends Component {

  constructor (props) {
    super(props);
    
    this.state = {
        Comments:[]
    }
    this.connection = new HubConnectionBuilder().withUrl("/serverHub").build();

    
  }

  componentDidMount(){
      fetch('../Comment/GetCommentByCharacter/'+ this.props.CharacterId)
      .then(data => data.json())
      .then(data =>{
          this.setState({Comments:data})
          var instan = this;

          this.connection.on("UpdateComments",function (comments){
                instan.setState({Comments:comments})
          })

          this.connection.start();

      })
      


  }

  postComment(e){
      fetch('../Comment/AddComment',{
            method: "post",
            headers: new Headers({
            'Authorization': 'Bearer '+ getCookie("token"), 
            'Content-type': "application/json charset=utf-8",
          }),
          body:JSON.stringify({'CharacterId': this.props.CharacterId,'Content': document.getElementById("commentContext").value})
      })
      .then(data => data.json())
      .then(data => {
        if(data.status == 200){
            this.connection.invoke("CommentAdded", this.props.CharacterId).catch(function (err) {
                alert("Can't call to server Hub"+ err)
            });
            document.getElementById("commentContext").value = ""
        }

      })
  }


  render(){

    let Comments = this.state.Comments.map(x => {
        return (
            <div className="row">
                    <div class="col-sm-1">
                        <div class="thumbnail">
                            <img class="img-responsive user-photo" src={`https://ui-avatars.com/api/?name=${x.userName}`}/>
                        </div>
                    </div>

                    <div class="col-sm-5">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <strong>{x.userName}</strong> <span class="text-muted">{x.createDate}</span>
                            </div>
                            <div class="panel-body">
                             {x.content}
                            </div>
                        </div>
                    </div>                                  

                </div>
        )

    })


    let commentBox = (isUserLogin())?
    (
        <div className="row form-group" >
                <textarea className="form-control col-sm-5" id="commentContext"></textarea>
                <button onClick={(e)=> this.postComment(e)} className=" col-sm-1">Comment</button>
        </div>
    ):
    (
        <div className="row form-group" >
        </div>
    )

    return (
        <div className="comment-container">
            {commentBox}

            <br/>
            
            <div className="comment-list">
                {Comments}
            </div>
        </div>
    )

  }



}