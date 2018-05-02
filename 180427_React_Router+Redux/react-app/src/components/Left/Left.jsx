import './Left.scss';
import React from 'react';
import BScroll from 'better-scroll';
import Drag from '../../assets/drag';

console.log(Drag);


// import store from '../../store/store';
// import TabActionCreater from '../../actions/Tab/TabActionCreater';

class Left extends React.Component {
  componentDidMount() {
    const BS = new BScroll(this.refs.left_BScroll, {});
    // touchEnd可用于实现 下拉刷新 上拉加载 功能
    BS.on('touchEnd', (e) => {
      // console.log(e);
    })

    // 
  }
  render() {
    return (
      <div className="left_BScroll left_In_Animation" ref="left_BScroll">
        <div className="left_wrap">
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