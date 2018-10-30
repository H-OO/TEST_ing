import * as React from 'react';
import './Home.scss';

const logo = require('./logo.svg');

import { Link } from 'react-keeper'; // 需声明

interface I_state {
  nav?: Array<string>
}

class Home extends React.Component {
  public constructor(arg: Object) {
    super(arg);
    this.state = {
      nav: ['M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8']
    };
  }
  componentDidMount() {
    // http://127.0.0.1:8080/common.do?method=loginV2&username=15599991112&md5Pwd=ba5cbfec1ff34168f1ab08e19fd397b0&validCode=&subtime=1540889652210
    // https://ckh-test.touna.cn/common.do?method=loginV2&username=15599991112&md5Pwd=ba5cbfec1ff34168f1ab08e19fd397b0&validCode=&subtime=1540889652210
    const xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open('GET', '/common.do?method=loginV2&username=15599991112&md5Pwd=ba5cbfec1ff34168f1ab08e19fd397b0&validCode=&subtime=1540889652210', true);
    xhr.onreadystatechange = () => {
      console.log(xhr.response);
    };
    xhr.send(null);
  }
  public render(): Object {
    console.log('Home render..');
    const { nav }: I_state = this.state;
    const lis: Array<Object> = nav.map((item, i) => {
      return (
        <li className="home__nav__square" key={i}>
          <Link to={`/${item.toLowerCase()}`}>{item}</Link>
        </li>
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
