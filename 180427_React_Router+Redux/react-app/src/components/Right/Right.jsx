import './Right.scss';
import React from 'react';
import BScroll from 'better-scroll';

import store from '../../store/store';
import TabActionCreater from '../../actions/Tab/TabActionCreater';

import Move from '../../assets/move';
import Drag from '../../assets/drag';

class Right extends React.Component {
  componentDidMount() {
    new BScroll(this.refs.right_BScroll);

    // 拉拽
    const drag = new Drag({
      target: this.refs.right_BScroll,
      direction: 'horizontal',
      callback: () => {
        const _drag = drag;
        const {
          offsetLeft
        } = _drag.targetDom;
        // 判断是否执行回弹动画
        if (offsetLeft > 0 || offsetLeft < 0) {
          if (offsetLeft > 80) {
            this.props.history.push('/left');
            TabActionCreater({
              type: 'LINE_SLIDE',
              lineSlide: false
            })(store.dispatch, store.getState)
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