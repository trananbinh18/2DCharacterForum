import React, { Component } from 'react';
import './Cell.css';

export class CellImage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      position_top: null,
      position_left: null,
      keyFrame: null
    }


  }

  onDragOverEvent(e) {
  }

  onDropEvent(e) {
    e.preventDefault();

    let styleSheet = document.styleSheets[0];

    let recElement = e.target.getBoundingClientRect();
    let subX = recElement.left;
    let subY = recElement.top;

    let animationName = `animation${Math.round(Math.random() * 100)}`

    let keyframes =
      `@-webkit-keyframes ${animationName} {
        0% {-webkit-transform:translate(${this.state.position_left}px,${this.state.position_top}px)} 
        100% {-webkit-transform:translate(${e.clientX - 75 -subX}px,${e.clientY - 75- subY}px)}
    }`;

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    this.setState({ keyFrame: animationName });
    this.setState({ position_top: e.clientX - 75 - subY })
    this.setState({ position_left: e.clientY - 75 - subX})


  }

  render() {

    let style = {
      animationName: this.state.keyFrame,
      animationTimingFunction: 'ease-in-out',
      animationDuration: '0.7s',
      animationDelay: '0.0s',
      animationIterationCount: 1,
      animationDirection: 'normal',
      animationFillMode: 'forwards'
    };
    return (
      <img style={style} draggable="true" id={"img_"+this.props.id} onDragStart={(ev)=>ev.dataTransfer.setData("text", ev.target.id)} onDrag={(e) => this.onDragOverEvent(e)} onDragEnd={(e) => this.onDropEvent(e)} src={this.props.src} className="heartBeat" />
    );
  }
}

