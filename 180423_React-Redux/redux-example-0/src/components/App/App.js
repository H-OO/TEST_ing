import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import store from '../../store/store';
console.log(store);


class App extends Component {
  constructor() {
    super();
    this.add = this.add.bind(this);
    this.cutback = this.cutback.bind(this);
    this.viewChange = this.viewChange.bind(this);
    this.state = {
      count: store.getState().count
    };
  }
  add() {
    console.log('__ADD__');
    let newCount = Object.assign({}, this.state, {});
    newCount = newCount.count;
    const action = {
      type: '__COUNT__',
      value: ++newCount
    };
    store.dispatch(action); // 发送 __COUNT__ Action
  }
  cutback() {
    console.log('__CUTBACK__');
    let newCount = Object.assign({}, this.state, {});
    newCount = newCount.count;
    const action = {
      type: '__COUNT__',
      value: --newCount
    };
    store.dispatch(action); // 发送 __COUNT__ Action
  }
  viewChange() {
    console.log('__VIEWCHANGE__');
    this.setState({
      count: store.getState().count
    })
  }
  componentDidMount() {
    console.log('__LISTENER__');
    const unsubscribe = store.subscribe(this.viewChange); // 订阅store.state的改变，参数为触发的回调函数
    this.unsubscribe = unsubscribe; // 取消订阅的方法
  }
  componentWillUnmount() {
    console.log('__REMOVE-LISTENER__');
    this.unsubscribe(); // 取消订阅
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>
          <h3>{this.state.count}</h3>
          <button onClick={this.add}>+</button>
          <button onClick={this.cutback}>-</button>
        </div>
      </div>
    );
  }
}

export default App;
