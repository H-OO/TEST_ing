import React, { Component } from 'react';
import store from '../../store/store';
import TestActionCreater from '../../actions/TestActionCreater';
class Test extends Component {
  constructor() {
    super();
    this.subscribeHandler = this.subscribeHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.state = {
      payload: store.getState().Test.payload
    };
  }
  subscribeHandler() {
    this.setState({
      payload: store.getState().Test.payload
    })
  }
  changeHandler() {
    TestActionCreater({
      type: 'change',
      payload: '_change_value_'
    })(store.dispatch, store.getState);
  }
  componentDidMount() {
    const unsubscribe = store.subscribe(this.subscribeHandler);
    this.setState({
      unsubscribe
    });
    TestActionCreater({
      type: 'init',
      payload: '_init_value_'
    })(store.dispatch, store.getState);
  }
  componentWillUnmount() {
    this.state.unsubscribe(this.subscribeHandler);
  }
  render() {
    return (
      <div>
        <div>{this.state.payload}</div>
        <button onClick={this.changeHandler}>change</button>
      </div>
    )
  }
}

export default Test;