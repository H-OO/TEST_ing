import React from 'react';
import './Tab.scss';

import { NavLink } from 'react-router-dom';

import store from '../../store/store';
import TabActionCreater from '../../actions/Tab/TabActionCreater';


class Tab extends React.Component {
  constructor() {
    super();
    this.lineSlideLeft = this.lineSlideLeft.bind(this);
    this.lineSlideRight = this.lineSlideRight.bind(this);
    this.addLineSlideListener = this.addLineSlideListener.bind(this);
    this.state = {
      lineSlide: store.getState().Tab.lineSlide
    };
  }
  lineSlideLeft() {
    TabActionCreater({
      type: 'LINE_SLIDE',
      lineSlide: false
    })(store.dispatch, store.getState)
  }
  lineSlideRight() {
    TabActionCreater({
      type: 'LINE_SLIDE',
      lineSlide: true
    })(store.dispatch, store.getState)
  }
  addLineSlideListener() {
    this.setState({
      lineSlide: store.getState().Tab.lineSlide
    })
  }
  componentDidMount() {
    store.subscribe(this.addLineSlideListener);
    if (this.props.location.pathname === '/right') {
      this.lineSlideRight();
    }
  }
  render() {
    return (
      <div className='tab_wrap'>
        <div className='tab_menu'>
          <NavLink to='/tab/left' className='tab_menu_left' activeClassName='tab_menu_active' onClick={this.lineSlideLeft}>/Left</NavLink>
          <NavLink to='/tab/right' className='tab_menu_right' activeClassName='tab_menu_active' onClick={this.lineSlideRight}>/Right</NavLink>
        </div>
        <div className='tab_line_box'>
          <div className={this.state.lineSlide ? 'tab_line tab_line_slide' : 'tab_line'}></div>
        </div>
      </div>
    )
  }
}

export default Tab;