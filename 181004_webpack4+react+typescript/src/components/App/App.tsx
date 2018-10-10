import * as React from 'react';
import './App.scss';
const logo = require('./logo.svg');

import { log as _log } from '../../asset/m2';
_log('123');

// Some samples to try
let strings = ["Hello", "98052", "101"];

import * as Validation from '../../asset/Validation';

console.log(Validation);
// // Validators to use
// let validators: { [s: string]: Validation.StringValidator; } = {};
// validators["ZIP code"] = new Validation.ZipCodeValidator();
// validators["Letters only"] = new Validation.LettersOnlyValidator();

// // Show whether each string passed each validator
// for (let s of strings) {
//   for (let name in validators) {
//       console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
//   }
// }

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
  componentWillMount() {}
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
