import React, { Component } from 'react';
import './Home.css'
import {Cell} from './Cell';
import {Trash} from './Trash';
import {wrapGrid} from 'animate-css-grid' 
import Shuffle from 'shufflejs';
import {Rocket} from './Rocket'

export class Home extends Component {
  static displayName = Home.name;

  constructor(props){

    super(props)
    var currentPage = (this.props.match.params.id!=undefined)?parseInt(this.props.match.params.id):1
    this.state={
      posts:[
      ],
      currentPage:currentPage,
      maxIndex:3,
      numberOfPage:0
    }
     
  }

  previousPage(e){
    if(this.state.currentPage-1>0){
      let previousPageNum = this.state.currentPage-1
      this.props.history.push("/home/"+previousPageNum)
      this.setState({currentPage: previousPageNum})
    }else{
      alert("Can't move to previous page")
    }
  }

  nextPage(e){
    if(this.state.currentPage+1<=this.state.numberOfPage){
      let nextpageNum = parseInt(this.state.currentPage+1)
      this.props.history.push("/home/"+ nextpageNum)
      this.setState({currentPage: nextpageNum})
    }else{
      alert("Can't move to next page")
    }
  }



  componentDidMount(){
    fetch('/Character/GetListCharacter',{
      method:'get'
    }).then(data => data.json())
        .then(data => {
          console.log('data',data)
            var newData = []
            for (let index in data) {
              console.log("index",index)
                newData.push({ id: data[index].id, img: data[index].imagePath, name: data[index].name, description: data[index].description })
            }
            this.setState({posts: newData})
            this.setState({numberOfPage: Math.ceil(newData.length/3)})

            console.log("PostNek",this.state.posts)
        })
  }



  
  render () {
    let beginPage = (this.state.currentPage-1) * 3
    let endPage = ((beginPage+2)>this.state.posts.length-1)?this.state.posts.length-1:beginPage+2

    let posts = []
    console.log("hello mang params day",this.props.match.params)

    for(let i=beginPage;i<=endPage;i++){
      posts.push(<Cell key={this.state.posts[i].id} data={this.state.posts[i]}/>);
    }

    return (
      <div className="home-container">
        <div id="grid-container" className="grid-container">
        {posts}
        </div>

        <div className="paging-bar">
          <img src="./Image/left.png" onClick={(e)=>this.previousPage(e)}/>
          <img src="./Image/right.png" onClick={(e)=>this.nextPage(e)}/>
        </div>

        <div id="trash-container">
          <Trash/>
        </div>

        <div id="rocket-container">
          <Rocket history={this.props.history}/>
        </div>
      </div>
    );
  }
}
