import React, { Component } from 'react';
import './css/App.css';
import { HashRouter, Route } from 'react-keeper';
import store from '../../store';
import Home from '../Home/Home.jsx';
import List from '../List/List.jsx';
import Detail from '../Detail/Detail.jsx';
import UserCenter from '../UserCenter/UserCenter.jsx';
import Login from '../Login/Login.jsx';

class App extends Component {
  constructor() {
    super();
    this.back = this.back.bind();
    this.getAsyncComponent = this.getAsyncComponent.bind();
    this.checkLoginState = this.checkLoginState.bind();
  }
  back() {
    window.history.back();
  }
  getAsyncComponent(callback) {
    import('../AsyncComponent/AsyncComponent.jsx').then((component) => {
      callback(component.default);
    })
  }
  checkLoginState (callback, props) {
    const {path} = props;
    const {loginState} = store.getState().login;
    if (loginState) {
      // 已登录
      switch (path) {
        case '/userCenter':
          callback();
          break;
        case '/login':
          alert('用户已登录，自动跳转至首页');
          window.location.hash = '#/';
          break;
        default:
          return;
      }
    } else {
      // 未登录
      switch (path) {
        case '/userCenter':
          alert('用户未登录，自动跳转至登录页');
          window.location.hash = '#/login';
          break;
        case '/login':
          callback();
          break;
        default:
          return;
      }
    }
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
          <Route component={UserCenter} path='/userCenter' enterFilter={this.checkLoginState} />
          <Route component={Login} path='/login' enterFilter={this.checkLoginState}/>
        </div>
      </HashRouter>
    );
  }
}

export default App;
