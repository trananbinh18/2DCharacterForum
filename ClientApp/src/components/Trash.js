import React, { Component } from 'react';
import './Trash.css';

export class Trash extends Component {

  constructor(props) {
    super(props)

  }


    AllowDrop(ev) {
    ev.preventDefault();
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
                console.log(count)
                count++
                if(document.getElementById(targetId)!= null){
                    let deleteElement = document.getElementById(targetId).parentNode
                    deleteElement.parentNode.removeChild(deleteElement)
                }
                
            }
        }, 200);
      }

    
  }


  render() {
    return (
      <div className="trash-field">
          <img onDropCapture={(e)=>this.drop(e)} onDragOver={(e)=>this.AllowDrop(e)} src="https://media1.giphy.com/media/5LkN6VlXZu1m4xRMEZ/source.gif" />
      </div>
    );
  }
}

