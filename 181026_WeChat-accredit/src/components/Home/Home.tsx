import * as React from 'react';
import './Home.scss';

const logo = require('./logo.svg');

// const wxAuth = require('../../asset/try/wxA');
// console.log(wxAuth);

const xhr = new XMLHttpRequest();
xhr.open('POST', '/manage/sys/login');
xhr.onreadystatechange = (e) => {
  console.log(e);
};
const param = {
  account: 'admin',
  password: '123456'
};
xhr.send(param);

interface I_state {
  nav?: Array<string>
}

class Home extends React.Component {
  public constructor(arg: Object) {
    super(arg);
  }
  public render(): Object {
    console.log('Home render..');
    return (
      <div className="home">
        <div><img src={logo} alt="" className="logo" /></div>
        {/* <div>Hello World!</div> */}
      </div>
    );
  }
}

export default Home;
