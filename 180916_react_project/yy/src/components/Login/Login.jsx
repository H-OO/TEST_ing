import React, { Component } from 'react';
import store from '../../store';
import loginActionCreater from '../../actions/loginActionCreater';

class Login extends Component {
  constructor() {
    super();
    this.form = React.createRef(); // 用于获取DOM
    this.submitHandler = this.submitHandler.bind(this);
  }
  submitHandler(e) {
    e.preventDefault();
    const {current} = this.form;
    let {username, password} = current;
    username = username.value;
    password = password.value;
    if (username.length < 1) {
      alert('请输入账户');
    } else if (password.length < 1) {
      alert('请输入密码');
    } else {
      const loginMsg = {
        username,
        password
      };
      console.log(loginMsg);
      loginActionCreater({
        type: 'login',
        loginState: true
      })(store.dispatch, store.getState)
      console.log(store.getState().login);
      // 获取登录状态 const {loginState} = store.getState().login;
      
      alert('登录成功！自动前往首页');
      window.location.hash = '#/';
    }
  }
  render() {
    return (
      <div className='login'>
        <h2>Login</h2>
        <form action="" ref={this.form} onSubmit={this.submitHandler}>
          <label>username: </label>
          <input type="text" name='username' />
          <br/>
          <label>password: </label>
          <input type="password" name='password' />
          <br/>
          <button type='submit'>submit</button>
        </form>
      </div>
    )
  }
}
export default Login;
