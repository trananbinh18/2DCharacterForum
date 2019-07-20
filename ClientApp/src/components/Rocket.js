import React, { Component } from 'react';
import './Rocket.css'

export class Rocket extends Component {

  constructor(props) {
    super(props)
    this.state = {img:"https://thumbs.dreamstime.com/z/vector-outline-hand-draw-sketch-door-outline-hand-draw-sketch-door-100260337.jpg",
    currentCharacterId: 0
    }
  }
  
    AllowDrop(e){
        e.preventDefault();
    }

    drop(e){
        if(e.dataTransfer != null){
            let targetId = e.dataTransfer.getData("text")
            var fadeTarget = document.getElementById(targetId).parentNode;
            let count = 0;
            var fadeEffect = setInterval(function () {  
                if (!fadeTarget.style.opacity) {
                    fadeTarget.style.opacity = 1;
                }
                if (fadeTarget.style.opacity > 0) {
                    fadeTarget.style.opacity -= 0.1;
                } else {
                    clearInterval(fadeEffect);
                    
                    count++
                }
            }, 200);
          }

          let characterId = e.dataTransfer.getData("text").split("_")[1];
           if(characterId!=undefined){
              this.state.currentCharacterId = characterId
          }
    }

    dragover(){
        this.setState({img:"https://thumbs.dreamstime.com/z/vector-outline-hand-draw-sketch-door-outline-hand-draw-sketch-door-100260337.jpg"})
    }

    dragenter(){
        this.setState({img:"https://thumbs.dreamstime.com/z/vector-outline-hand-draw-sketch-doorn-outline-hand-draw-sketch-door-100260515.jpg"})
    }

    rocketMove(e){
      var currentTop = e.target.getBoundingClientRect().y;
      console.log("currentTop",currentTop)
      if(currentTop < -20 && this.state.currentCharacterId!=0){
        this.props.history.push("/character-detail/"+this.state.currentCharacterId)
      }

    }


  render() {
    return (
        <div id="axis">
          <img onMouseMoveCapture={(e)=> this.rocketMove(e)} className="move-up object" id="rocket" src="https://cdn.tutsplus.com/webdesign/uploads/legacy/articles/042_css_animation_intro/demo.html/images/rocket.png"/>
          
          <img src={this.state.img} className="disappear object" id="space" onDragLeave={()=>this.dragover()} onDragEnter={()=>this.dragenter()} onDropCapture={(e)=>this.drop(e)} onDragOver={(e)=>this.AllowDrop(e)} />


        </div>
    );
  }
}

