import React, { Component } from 'react';
import store from '../../store/store';
import LoginActionCreater from '../../actions/LoginActionCreater';
class Settings extends Component {
  constructor() {
    super();
    this.exit = this.exit.bind(this);
    this.pathJump = this.pathJump.bind(this);
    this.state = {
      unsubscribe: null
    };
  }
  exit() {
    LoginActionCreater({
      type: 'exit',
      loginState: false
    })(store.dispatch, store.getState);
  }
  pathJump() {
    const {type, loginState} = store.getState().Login;
    if (loginState === false && type === 'exit') {
      alert('退出成功，跳转至登录页');
      this.props.history.push('/login');
    }
  }
  componentWillMount() {  
    const unsubscribe = store.subscribe(this.pathJump);
    this.setState({
      unsubscribe
    });
  }
  componentWillUnmount() {
    this.state.unsubscribe(this.pathJump);
  }
  render() {
    return (
      <div>
        <div>【Settings】</div>
        <button onClick={this.exit}>退出登录</button>
      </div>
    )
  }
}
export default Settings;
