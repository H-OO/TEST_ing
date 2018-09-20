import React, { Component } from 'react';
import './App.scss';
import logo from './logo.svg';

require.ensure([], () => {
  require('../../asset/a')
  require('../../asset/b')
}, 'chunk1')

if(false){
  require.ensure([], () => {
    require('../../asset/c')
  }, 'chunk2')
}

class App extends Component {
  render() {
    return (
      <div className='App'>
        <img src={logo} alt="" className='App_logo' />
      </div>
    )
  }
}

export default App;