import React, { Component } from 'react';
import './CreateCharacter.css'
import PropTypes from "prop-types";
import {getCookie} from '../CheckUserService'; 



export class CreateCharacter extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props,context){
    super(props,context)
    
    this.state = {
      NameMessage:null,
      DescriptionMessage:null,
      ImageMessage:null,
      ContentMessage:null,
      CategoryIdMessage:null,
      ListCategory:[],
      imagesrc: null
    }
    console.log("context",context)
  }

  componentDidMount(){
    fetch('./Character/GetAllCategory',{
      method: 'get'
    })
    .then(data => data.json())
    .then(data =>{
      this.setState({ListCategory:data})
    })
  }

  submitFormData(e){
     e.preventDefault()

    let name = document.getElementById("Name").value
    let description = document.getElementById("Description").value
    let image = document.getElementById("Image").files[0]
    let content = document.getElementById("Content").value
    let categoryId = document.getElementById("CategoryId").value

    var data = new FormData()
    data.append("Name",name)
    data.append("Description",description)
    data.append("Image",image)
    data.append("Content",content)
    data.append("CategoryId",categoryId)


    fetch('./Character/CreateCharacter', {
        method: 'post',
        headers: new Headers({
          'Authorization': 'Bearer '+ getCookie("token"), 
        }),
        body: data
    })
    .then(data => data.json())
    .then(data => {    
      console.log(this)  
      console.log(data)
      alert(data.message)
      for(let field in data.listError){
        let message = (data.listError[field].errors.length>0)?data.listError[field].errors[0].errorMessage:null
        this.setState({[data.listError[field].key+"Message"]: message})
      }
      this.setState({imagesrc:data.url})
      this.context.router.history.push("/");


    })
  }

  displayImage(e){
    let fileInput = e.target
    if(fileInput.files && fileInput.files[0]){
      let reader = new FileReader()

      reader.onload = function(evt){
        document.getElementById("DisplayImage").setAttribute("src",evt.target.result)

      }
      reader.readAsDataURL(e.target.files[0])

    }

  }
  

  render () {
    console.log("state.ListCategory",this.state.ListCategory)
    let listCate = this.state.ListCategory.map(x => {
      return <option key={x.id} value={x.id}>{x.name}</option>
    })

    return (
      <div className="create-character-container">
        <img id="imgbinh" src={this.state.imagesrc}/>
       <form method="post" enctype="multipart/form-data">
            
            <div class="form-group">
                <label for="Name">Name</label>
                <input type="text" class="form-control" id="Name" placeholder="Enter Name"/>
                <div class="error-message">
                    {this.state.NameMessage}
                </div>
            </div>
            
            <div class="form-group">
                <label for="Description">Description</label>
                <input type="text" class="form-control" id="Description" placeholder="Enter Description"/>
                <div class="error-message">
                    {this.state.DescriptionMessage}
                </div>
            </div>
            <div class="form-group">
                <label for="Content">Content</label>
                <input type="text" class="form-control" id="Content" placeholder="Enter Content"/>
                <div class="error-message">
                    {this.state.ContentMessage}
                </div>
            </div>
            <div class="form-group">
                <label for="Image">Image</label>
                <input type="file" class="form-control" id="Image" placeholder="Enter Image" onChange={(e)=> this.displayImage(e)}/>
                <img src='' id="DisplayImage" />
                <div class="error-message">
                    {this.state.ImageMessage}
                </div>
            </div>

            <div class="form-group">
                <label for="CategoryId">CategoryId</label>
                <select type="CategoryId" class="form-control" id="CategoryId" placeholder="Enter CategoryId">
                    {listCate} 
                </select>
                <div class="error-message">
                      {this.state.CategoryIdMessage}
                </div>
            </div>

            <button onClick={(e)=>this.submitFormData(e)} type="submitFormData" class="btn btn-primary">Submit</button>

       </form>
      </div>
    );
  }
}
