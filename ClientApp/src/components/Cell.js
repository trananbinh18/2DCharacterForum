import React, { Component } from 'react';
import './Cell.css'
import {CellImage} from './CellImage'

export class Cell extends Component {


  render () {
    return (
      <div className="grid-item">
          <CellImage src={this.props.data.img} id={this.props.data.id}/>
            <p><strong>{this.props.data.name}</strong></p>
            <p>{this.props.data.description}</p>
      </div>
    );
  }
}
