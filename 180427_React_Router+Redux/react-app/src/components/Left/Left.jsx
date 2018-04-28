import React from 'react';
import BScroll from 'better-scroll';

import './Left.scss';

class Left extends React.Component {
  componentDidMount() {
    new BScroll(this.refs.left_BScroll)
    console.log(this.refs.left_BScroll);
    
  }
  render() {
    return (
      <div className="left_BScroll" ref="left_BScroll">
        <div className="left_wrap left_In_Animation">
          <div className="left_item_0">
            <div className="left_item_0_top"></div>
            <div className="left_item_0_bottom">
              <div className="left_item_0_bottom_thunk0"></div>
              <div className="left_item_0_bottom_thunk1"></div>
            </div>
          </div>
          <div className="left_item_0">
            <div className="left_item_0_top"></div>
            <div className="left_item_0_bottom">
              <div className="left_item_0_bottom_thunk0"></div>
              <div className="left_item_0_bottom_thunk1"></div>
            </div>
          </div>
          <div className="left_item_0">
            <div className="left_item_0_top"></div>
            <div className="left_item_0_bottom">
              <div className="left_item_0_bottom_thunk0"></div>
              <div className="left_item_0_bottom_thunk1"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Left;