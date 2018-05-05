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
      target: this.refs.right_drag,
      direction: 'horizontal',
      callback: params => {
        const _drag = drag; // 拖拽实例
        const {
          x
        } = params;
        console.log(x);
        if (x > 60) {
          TabActionCreater({
            type: 'LINE_SLIDE',
            lineSlide: false
          })(store.dispatch, store.getState)
          this.props.history.push('/left');
        } else {
          Move['ease']([x, 0], 800, (v) => {
            _drag.targetDom.style.transform = `translateX(${v}px)`;
          })
        }
      }
    });
  }
  render() {
    return (
      <div className="right_drag" ref="right_drag">
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
      </div>
    )
  }
}

export default Right;