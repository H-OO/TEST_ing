import React from 'react';
import BScroll from 'better-scroll';
import './Right.scss';

class Right extends React.Component {
  componentDidMount() {
    new BScroll(this.refs.right_BScroll);
  }
  render() {
    return (
      <div className="right_BScroll right_In_Animation" ref="right_BScroll">
        <div className="right_wrap">
          <div className="right_item_0">
            <div className="right_item_0_thunk0"></div>
            <div className="right_item_0_thunk1"></div>
          </div>
          <div className="right_item_0">
            <div className="right_item_0_thunk0"></div>
            <div className="right_item_0_thunk1"></div>
          </div>
          <div className="right_item_0">
            <div className="right_item_0_thunk0"></div>
            <div className="right_item_0_thunk1"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Right;