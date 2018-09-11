import React, { Component } from 'react';
import store from '../../store/store';
import LoginActionCreater from '../../actions/LoginActionCreater';
class Login extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.pathJump = this.pathJump.bind(this);
    this.form = React.createRef();
    this.state = {
      num: 0
    };
  }
  login(e) {
    e.preventDefault();
    const form = this.form.current;
    const username = form.username.value;
    const passward = form.passward.value;
    if (username.length !== 0 && passward.length !== 0) {
      LoginActionCreater({
        type: 'login',
        loginState: true
      })(store.dispatch, store.getState);
    } else {
      alert('请输入账户和密码');
    }
  }
  pathJump() {
    const {loginState} = store.getState().Login;
    if (loginState) {
      alert('登录成功，跳转至首页');
      this.props.history.push('/');
    }
  }
  componentWillMount() {
    const unsubscribe = store.subscribe(this.pathJump);
    this.setState({
      unsubscribe
    });
    const {loginState} = store.getState().Login;
    if (loginState) {
      alert('用户已登录，跳转至首页');
      this.props.history.push('/');
    }
  }
  componentWillUnmount() {
    this.state.unsubscribe(this.pathJump);
  }
  render() {
    const {num} = this.state;
    return (
      <div>
        <div>【Login】</div>
        <form action="" ref={this.form} onSubmit={this.login}>
          <label>username</label>
          <input type="text" name="username"/>
          <br/>
          <label>passward</label>
          <input type="text" name="passward"/>
          <br/>
          <button type="submit">submit</button>
        </form>
        <br/>
        <div>{num}</div>
      </div>
    )
  }
}

export default Login;