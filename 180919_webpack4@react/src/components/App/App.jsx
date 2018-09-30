import React, { Component } from 'react';
import './App.scss';
import logo from './logo.svg';
import { log } from 'util';

require.ensure(
  [],
  () => {
    const a = require('../../asset/a');
    a();
    const b = require('../../asset/b');
    b();
  },
  'asyncJs_0'
);

class App extends Component {
  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }
  handler() {
    require.ensure(
      [],
      () => {
        const c = require('../../asset/c');
        c();
      },
      'asyncJs_1'
    );
  }
  lodashHr() {
    console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }));
  }
  render() {
    return (
      <div className="App">
        <img src={logo} alt="" className="App_logo" />
        <br />
        <button onClick={this.handler}>get</button>
        <button onClick={this.lodashHr}>lodash</button>
      </div>
    );
  }
}

export default App;
