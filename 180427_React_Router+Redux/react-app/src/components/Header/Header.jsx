import './Header.scss';
import React from 'react';

import store from '../../store/store';

class Header extends React.Component {
  constructor() {
    super();
    this.back = this.back.bind(this);
    this.addTitleListener = this.addTitleListener.bind(this);
    this.state = {
      title: store.getState().Header.title,
      unsubscribe: null
    };
  }
  componentDidMount() {
    const unsubscribe = store.subscribe(this.addTitleListener);
    this.setState({
      unsubscribe
    });
  }
  componentWillUnmount() {
    this.state.unsubscribe(this.addTitleListener);
  }
  // 路由回退一步
  back() {
    this.props.history.goBack();
  }
  addTitleListener() {
    this.setState({
      title: store.getState().Header.title
    });
  }
  render() {
    return (
      <div className="header_wrap">
        <div className="header_back" onClick={this.back}></div>
        <div className="header_title">{this.state.title}</div>
        <div className="header_search"></div>
      </div>
    )
  }
}

export default Header;