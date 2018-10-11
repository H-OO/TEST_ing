import * as React from 'react';
import './App.scss';
const logo = require('./logo.svg');

class App extends React.Component {
    constructor(param: object) {
    super(param);
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
    // 动态加载
    require.ensure([], () => {
      const _ = require('lodash');
      console.log(_.defaults({ a: 1 }, { a: 3, b: 2 }));
    });
  }
  componentWillMount() {
    let str: string = 'abcde';
    let strLength: number = str.length;
    console.log(strLength);
  }
  public render() {
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
