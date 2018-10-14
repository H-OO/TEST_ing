import * as React from 'react';
import './Home.scss';
const logo = require('./logo.svg');

interface I_state {
  nav?: Array<string>
}

class Home extends React.Component {
  public constructor(arg: object) {
    super(arg);
    this.state = {
      nav: ['List', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8']
    };
  }
  public render() {
    console.log('Home render..');
    const { nav }: I_state = this.state;
    const lis: Array<object> = nav.map((item, i) => {
      return (
        <li key={i}>{item}</li>
      )
    });
    return (
      <div className="home">
        <div><img src={logo} alt="" className="logo" /></div>
        <ul className="home__nav">
          {lis}
        </ul>
      </div>
    );
  }
}

export default Home;
