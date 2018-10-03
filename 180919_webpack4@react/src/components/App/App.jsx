import React, { Component } from 'react';
import './App.scss';
import logo from './logo.svg';

class App extends Component {
  constructor() {
    super();
    this.handler = this.handler.bind(this);
    this.lodashHr = this.lodashHr.bind(this);
  }
  handler() {
    const p = new Promise((done, err) => {
      done('200');
    });
    p.then(msg => {
      console.log(msg);
    });
  }
  lodashHr() {
    require.ensure(
      [],
      () => {
        const _ = require('lodash');
        console.log(_.defaults({ a: 1 }, { a: 3, b: 2 }));
      },
      'lodash'
    );
  }
  componentWillMount() {
    const o1 = {
      a: 1
    };
    const o2 = {
      a: 2,
      b: 2
    };
    const o = Object.assign({}, o1, o2);
    console.log(o);

    const s = new Set();

    [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

    for (let i of s) {
      console.log(i);
    }

    function* foo() {}
    console.log(foo);
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
