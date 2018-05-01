import './Left.scss';
import React from 'react';
import BScroll from 'better-scroll';

// import store from '../../store/store';
// import TabActionCreater from '../../actions/Tab/TabActionCreater';

class Left extends React.Component {
  componentDidMount() {
    const BS = new BScroll(this.refs.left_BScroll, {});
    // touchEnd可用于实现 下拉刷新 上拉加载 功能
    BS.on('touchEnd', (e) => {
      // console.log(e);
    })

    // let touchStartPlace = 0,
    //   touchEndPlace = 0;
    // let calculateONOFF = false;
      
    // window.ontouchstart = (e) => {
    //   touchStartPlace = e.targetTouches[0].clientX;
    // }
    // window.ontouchmove = (e) => {
    //   touchEndPlace = e.targetTouches[0].clientX;
    //   calculateONOFF = true;
    // }
    // window.ontouchend =  (e) => {
    //   if (!calculateONOFF) {
    //     return;
    //   }
    //   const offsetPx = touchEndPlace - touchStartPlace;
    //   if (offsetPx > 100) {
    //     this.props.history.push('/left');
    //     TabActionCreater({
    //       type: 'LINE_SLIDE',
    //       lineSlide: false
    //     })(store.dispatch, store.getState)
    //     console.log('显示L');
    //   } else if (offsetPx < -100) {
    //     this.props.history.push('/right');
    //     TabActionCreater({
    //       type: 'LINE_SLIDE',
    //       lineSlide: true
    //     })(store.dispatch, store.getState)
    //     console.log('显示R');
    //   }
    // }
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