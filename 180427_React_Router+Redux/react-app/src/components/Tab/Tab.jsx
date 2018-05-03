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

    let touchStartPlace = 0,
      touchEndPlace = 0;
    let calculateONOFF = false;
      
    window.ontouchstart = (e) => {
      touchStartPlace = e.targetTouches[0].clientX;
    }
    window.ontouchmove = (e) => {
      touchEndPlace = e.targetTouches[0].clientX;
      calculateONOFF = true;
    }
    window.ontouchend =  (e) => {
      return;
      if (!calculateONOFF) {
        return;
      }
      const offsetPx = touchEndPlace - touchStartPlace;
      console.log(this);
      
      if (offsetPx > 100) {
        this.props.history.push('/left');
        this.lineSlideLeft();
        console.log('显示L');
      } else if (offsetPx < -100) {
        this.props.history.push('/right');
        this.lineSlideRight();
        console.log('显示R');
      }
      calculateONOFF = false;
    }
  }
  render() {
    return (
      <div className='tab_wrap'>
        <div className='tab_menu'>
          <NavLink to='/left' className='tab_menu_left' activeClassName='tab_menu_active' onClick={this.lineSlideLeft}></NavLink>
          <NavLink to='/right' className='tab_menu_right' activeClassName='tab_menu_active' onClick={this.lineSlideRight}></NavLink>
        </div>
        <div className='tab_line_box'>
          <div className={this.state.lineSlide ? 'tab_line tab_line_slide' : 'tab_line'}></div>
        </div>
      </div>
    )
  }
}

export default Tab;