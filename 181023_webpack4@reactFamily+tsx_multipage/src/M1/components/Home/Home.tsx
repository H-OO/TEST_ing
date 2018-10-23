import * as React from 'react';
import './Home.scss';

const logo = require('./logo.svg');

interface I_state {
  nav?: Array<string>
}

class Home extends React.Component {
  public constructor(arg: Object) {
    super(arg);
    this.clickHr = this.clickHr.bind(this);
  }
  public clickHr() {
    // import('lodash').then((res) => {
    //   console.log(res);
    // });
    // 抽离并异步加载
    require.ensure(
      [],
      () => {
        const _ = require('lodash');
        console.log(_.defaults({ a: 1 }, { a: 3, b: 2 }));
      }
    );
  }
  public render(): Object {
    console.log('Home render..');
    return (
      <div className="home">
        <div><img src={logo} alt="" className="logo" /></div>
        <div>Hello World!</div>
        <button onClick={this.clickHr}>log</button>
      </div>
    );
  }
}

export default Home;
