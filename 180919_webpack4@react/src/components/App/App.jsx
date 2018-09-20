import React, { Component } from 'react';
import './App.scss';
import logo from './logo.svg';

require.ensure([], () => {
  require('../../asset/a')
  require('../../asset/b')
}, 'chunk1')

class App extends Component {
  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }
  handler() {
    require.ensure([], () => {
      require('../../asset/c')
    }, 'chunk2')
  }
  render() {
    return (
      <div className='App'>
        <img src={logo} alt="" className='App_logo' />
        <br/>
        <button onClick={this.handler}>get</button>
      </div>
    )
  }
}

export default App;