import React, { Component } from 'react';
import PropTypes from "prop-types";
import './CharacterDetail.css'
import {CommentBox} from './CommentBox'


export class CharacterDetail extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            CharacterId: this.props.match.params.id,
            Name: "",
            Description: "",
            Content: "",
            Catelogy: "",
            ImagePath:"",
            Author: ""
        }
    }
    
    componentDidMount(){
        console.log("asdhiusahd Hi")
        fetch("./Character/GetCharacter/"+this.state.CharacterId,{
            method: "get"
        })
        .then(data => data.json())
        .then(data => {
            this.setState({
                Name: data.name,
                Description: data.description,
                Content: data.content,
                Catelogy: data.catelogy,
                ImagePath: data.imagePath,
                Author: data.author
            })
        })
    }


    render(){

        return (
            <div className="character-detail-container-comment">
                <div className="character-detail-container">
                <h3>{this.state.Name}</h3>
                <div className="sub-title">{this.state.Catelogy} Create by: {this.state.Author}</div>
                <br/>
                <img src={this.state.ImagePath}/>
                <p>{this.state.Description}</p>
                <p>{this.state.Content}</p>
            </div>

            <hr/>

            <CommentBox CharacterId={this.state.CharacterId}/>

            </div>

            
        )
    }

}