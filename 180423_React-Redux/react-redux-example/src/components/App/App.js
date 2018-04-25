import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import store from '../../store/store'; // store
import goodsIdAction from '../../actions/goodsId';

class App extends Component {
  constructor() {
    super();
    this.handler = this.handler.bind(this);
    this.viewChange = this.viewChange.bind(this);
    this.state = {
      goodsId: store.getState().goodsId
    };
  }
  handler() {
    const dispatchMiddleware = goodsIdAction(1);
    dispatchMiddleware(store.dispatch, store.getState);
  }
  viewChange() {
    this.setState({
      goodsId: store.getState().goodsId
    });
  }
  componentDidMount() {
    store.subscribe(this.viewChange);
    this.handler();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>{this.state.goodsId}</div>
      </div>
    );
  }
}

export default App;
