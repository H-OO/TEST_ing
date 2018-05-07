import './Cart.scss';

import React from 'react';

import CartActionCreater from '../../actions/Cart/CartActionCreater';
import store from '../../store/store';

class Cart extends React.Component {
  constructor() {
    super();
    this.boxHandler = this.boxHandler.bind(this);
    this.addStateListener = this.addStateListener.bind(this);
    this.state = {
      contentShow: store.getState().Cart.contentShow,
      contentActive: store.getState().Cart.contentActive,
      btnActive: store.getState().Cart.btnActive
    };
  }
  boxHandler() {
    const show = 'cart_content show';
    const hide = 'cart_content hide';
    const enter = 'cart_btn enter';
    const leave = 'cart_btn leave';
    CartActionCreater({
      type: 'CONTENT_SHOW',
      contentShow: !this.state.contentShow,
    })(store.dispatch, store.getState)
    CartActionCreater({
      type: 'ACTIVE',
      contentActive: this.state.contentActive === 'cart_content' ? show : this.state.contentActive === show ? hide : show,
      btnActive: !this.state.btnActive === 'cart_btn' ? enter : this.state.btnActive === enter ? leave : enter
    })(store.dispatch, store.getState)
  }

  addStateListener() {
    this.setState({
      contentShow: store.getState().Cart.contentShow,
      contentActive: store.getState().Cart.contentActive,
      btnActive: store.getState().Cart.btnActive
    })
  }

  componentDidMount() {
    store.subscribe(this.addStateListener);
  }
  render() {
    return (
      <div className="cart_wrap">
        <div className="cart_box">
          <div className={this.state.contentActive}>
            <div className="cart_row0"></div>
            <div className="cart_row1"></div>
          </div>
          <div className={this.state.btnActive} onClick={this.boxHandler}></div>
        </div>
      </div>
    )
  }
}

export default Cart;