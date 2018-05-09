import './Cart.scss';

import React from 'react';

import store from '../../store/store';
import HeaderActionCreater from '../../actions/Header/HeaderActionCreater';
import CartActionCreater from '../../actions/Cart/CartActionCreater';

class Cart extends React.Component {
  constructor() {
    super();
    this.boxHandler = this.boxHandler.bind(this);
    this.addStateListener = this.addStateListener.bind(this);
    this.state = {
      contentShow: store.getState().Cart.contentShow,
      contentActive: store.getState().Cart.contentActive,
      btnActive: store.getState().Cart.btnActive,
      unsubscribe: null
    };
  }
  componentDidMount() {
    HeaderActionCreater({
      type: 'TITLE',
      title: 'Cart'
    })(store.dispatch, store.getState);

    const unsubscribe = store.subscribe(this.addStateListener);
    this.setState({
      unsubscribe
    })
  }
  componentWillUnmount() {
    // 销毁之前样式重置
    CartActionCreater({
      type: 'ACTIVE',
      contentActive: 'cart_content',
      btnActive: 'cart_btn'
    })(store.dispatch, store.getState)
    this.state.unsubscribe(this.addStateListener);
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
  render() {
    return (
      <div className="cart_wrap">
        <div className="cart_box">
          <div className={this.state.contentActive}>
            <div className="cart_row0"></div>
            <div className="cart_row1"></div>
          </div>
          <div className={this.state.btnActive} onClick={this.boxHandler}>
            {this.state.btnActive === 'cart_btn' ? 'Show' : this.state.btnActive === 'cart_btn leave' ? 'Show' : 'Hide'}
          </div>
        </div>
      </div>
    )
  }
}

export default Cart;