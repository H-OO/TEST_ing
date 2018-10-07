import * as React from 'react';
import './App.scss';
import logo from './logo.svg';
import { log } from 'util';

class App extends React.Component {
  constructor(param: object) {
    super(param);
    // this.handler = this.handler.bind(this);
    // this.lodashHr = this.lodashHr.bind(this);
  }
  handler() {
    // const p = new Promise((done, err) => {
    //   done('200');
    // });
    // p.then(msg => {
    //   console.log(msg);
    // });
  }
  lodashHr() {
    // require.ensure(
    //   [],
    //   () => {
    //     const _ = require('lodash');
    //     console.log(_.defaults({ a: 1 }, { a: 3, b: 2 }));
    //   },
    //   'lodash'
    // );
  }
  componentWillMount() {
    // let a: Array<number | string | object> = [1, 2, 3, '1', {}];
    // console.log(a);

    // let b: [string, number];
    // // b = [1, '1'];
    // b = ['1', 1];
    // console.log(b);
    // 枚举
    // enum Arr {First = 1, Second = 4, Third};
    // let c: Arr = Arr.Third;
    // console.log(c);

    // const o1 = {
    //   a: 1
    // };
    // const o2 = {
    //   a: 2,
    //   b: 2
    // };

    // const o = Object.assign({}, o1, o2);
    // console.log(o);

    // const s = new Set();

    // [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

    // for (let i of s) {
    //   console.log(i);
    // }

    // function* foo() {}
    // console.log(foo);
    // let {a, b}: {a: number, b: string} = {a: 123, b: 'yy'};
    // console.log(a, b);
    // let o = {
    //   a: 123,
    //   b: 'yy'
    // };

    // let { a: first, b: second = 'oo'}: { a: number; b?: string } = o;

    // console.log(first, second);

    // let {a, b}: {a: number, b?: string} = { a: 123};

    // 函数参数-对象解构
    // type C = {a: number, b: string};
    // // interface C {a: number, b: string};
    // function foo(param: C): object {
    //   // console.log(param);
    //   return param
    // }
    // foo({ a: 123, b: 'yy' });

    // type A = {
    //   readonly first: string,
    //   readonly second: number
    // };

    // const a: A = {
    //   first: '123',
    //   second: 123
    // };

    // console.log(a);

    // a.first = '234';
    // console.log(a);

    // const arr: ReadonlyArray<any> = [1, 'x'];
    // console.log(arr);
    // arr.push(1, 2);
    
    interface A {
      first: string,
      second: number,
      [propName: string]: any
    }
    const a: A = {
      first: '123',
      second: 123,
      third: [],
      fourth: {}
    };
    console.log(a);
    
  }
  public render() {
    return (
      <div className="App">
        <img src={logo} alt="" className="App_logo" />
        <br />
        {/* <button onClick={this.handler}>get</button>
        <button onClick={this.lodashHr}>lodash</button> */}
      </div>
    );
  }
}

export default App;
