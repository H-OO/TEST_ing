import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from '../../store/store';
class Home extends Component {
  componentWillMount() {
    const {loginState} = store.getState().Login;
    if(!loginState) {
      alert('未登录，请先登录');
      this.props.history.push('/login');
    }
  }
  render() {
    return (
      <div>
        <div>【Home】</div>
        <Link to='/settings'>Settings</Link>
        <br/>
        <Link to='/goodslist'>Goodslist</Link>
        <br/>
        <button onClick={()=> {this.props.history.goBack()}}>上一页</button>
      </div>
    )
  }
}

export default Home;