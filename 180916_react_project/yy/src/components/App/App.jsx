import React, { Component } from 'react';
import './css/App.css';
import { HashRouter, Route } from 'react-keeper';

import Home from '../Home/Home.jsx';
import List from '../List/List.jsx';
import Detail from '../Detail/Detail.jsx';

class App extends Component {
  constructor() {
    super();
    this.back = this.back.bind();
    this.getAsyncComponent = this.getAsyncComponent.bind();
  }
  back() {
    window.history.back();
  }
  getAsyncComponent(callback) {
    import('../AsyncComponent/AsyncComponent.jsx').then((component) => {
      callback(component.default);
    })
  }
  render() {
    return (
      <HashRouter>
        <div className="App">
          <button onClick={this.back}>Back</button>
          <Route component={Home} path='/>' index />
          <Route component={List} path='/list' />
          <Route component={Detail} path='/detail/:id' />
          <Route loadComponent={this.getAsyncComponent} path='/asyncComponent' />
        </div>
      </HashRouter>
    );
  }
}

export default App;
