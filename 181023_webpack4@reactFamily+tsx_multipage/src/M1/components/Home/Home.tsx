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
    import('lodash').then((res) => {
      console.log(res);
    });
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
