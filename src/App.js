import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      testArray: [{key: "value"}],
      testValue: "Test Value Success!"
    };
  }

  render() {
    console.log(this.state.testArray, this.state.testValue);
    return (
      <div>Test div...</div>
    )
  }
}