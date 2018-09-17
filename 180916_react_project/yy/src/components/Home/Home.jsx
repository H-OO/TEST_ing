import React, { Component } from 'react';
import { Link } from 'react-keeper';
class Home extends Component {
  constructor() {
    super();
    this.state = {
      num: Math.round(Math.random() * 100)
    }
  }
  render() {
    const {num} = this.state;
    return (
      <div className='home'>
        <h2>Home</h2>
        <div>随机数：【 {num} 】</div>
        <div>
          <Link to='/list'>to List</Link>
          <br/>
          <Link to='/asyncComponent'>to asyncComponent</Link>
          <br/>
          <Link to='/userCenter'>to userCenter</Link>
        </div>
      </div>
    )
  }
}

export default Home;
