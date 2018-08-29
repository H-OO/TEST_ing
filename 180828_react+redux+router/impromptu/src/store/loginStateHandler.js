import store from './store';

export default (_self) => {
  const loginState = store.getState().Login.loginState;
    if(!loginState) {
      alert('未登录，请先登录');
      _self.props.history.push('/login');
    }
}
