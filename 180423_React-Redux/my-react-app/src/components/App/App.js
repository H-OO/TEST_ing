import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import store from '../../store/store';
import goodsIdActionCreater from '../../actions/goodsId';
console.log(store.getState());


class App extends Component {
  constructor() {
    super();
    this.getData = this.getData.bind(this);
    this.changeView = this.changeView.bind(this);
    this.state = {
      goodsId: store.getState().goodsId
    };
  }
  getData() {
    goodsIdActionCreater()(store.dispatch, store.getState);
  }
  componentDidMount() {
    store.subscribe(this.changeView);
  }
  changeView() {
    console.log('__View___');
    this.setState({
      goodsId: store.getState().goodsId
    })
    console.log(store.getState());
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <h1 className="App-title">Welcome to React</h1> */}
        </header>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <div>{this.state.goodsId}</div>
        <button onClick={this.getData}>GET_DATA</button>
      </div>
    );
  }
}

export default App;
