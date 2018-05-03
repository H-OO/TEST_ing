import './Left.scss';
import React from 'react';
import BScroll from 'better-scroll';

// import store from '../../store/store';
// import TabActionCreater from '../../actions/Tab/TabActionCreater';

import Move from '../../assets/move';
import Drag from '../../assets/drag';

class Left extends React.Component {
  componentDidMount() {
    const BS = new BScroll(this.refs.left_BScroll, {});
    // touchEnd可用于实现 下拉刷新 上拉加载 功能
    BS.on('touchEnd', (e) => {
      // console.log(e);
    })

    // 拉拽
    const drag = new Drag({
      target: this.refs.left_BScroll,
      direction: 'horizontal',
      callback: () => {
        const _drag = drag;
        const {
          offsetLeft
        } = _drag.targetDom;
        // 判断是否执行回弹动画
        if (offsetLeft > 0 || offsetLeft < 0) {
          if (offsetLeft > 100 || offsetLeft < 100) {
            this.props.history.push('/right');
          } else {
            Move['ease']([offsetLeft, 0], 800, function (v) {
              _drag.targetDom.style.left = v + 'px';
            })
          }
        }
      }
    });
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