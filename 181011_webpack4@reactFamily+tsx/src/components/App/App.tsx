import * as React from 'react';
import './App.scss';
const { HashRouter, Route } = require('react-keeper');
import Home from '../Home/Home';

// import store from '../../store';
// const { dispatch, getState, subscribe } = store;

class App extends React.Component {
  public render() {
    console.log('App render..');
    return (
      <HashRouter>
        <div className="App">
          <Route component={Home} path="/>" index />
        </div>
      </HashRouter>
    );
  }
}

export default App;
