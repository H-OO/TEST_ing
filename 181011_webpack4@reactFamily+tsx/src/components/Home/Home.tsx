import * as React from 'react';
import './Home.scss';
const logo = require('./logo.svg');
class Home extends React.Component {
  public render() {
    console.log('Home render..');
    return (
      <div className="home">
        <img src={logo} alt="" className="logo" />
      </div>
    );
  }
}

export default Home;
