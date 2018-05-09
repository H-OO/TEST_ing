import './List.scss';
import React from 'react';

import store from '../../store/store';
import HeaderActionCreater from '../../actions/Header/HeaderActionCreater';
import ListActionCreater from '../../actions/List/ListActionCreater';

import BScroll from 'better-scroll';

class List extends React.Component {
  constructor() {
    super();
    this.addListListener = this.addListListener.bind(this);
    this.addAnimationScope = this.addAnimationScope.bind(this);
    this.addItem = this.addItem.bind(this);
    this.getLis = this.getLis.bind(this);

    this.state = {
      list: store.getState().List.list,
      animationScope: store.getState().List.animationScope,
      unsubscribe: null
    };
  }
  // 生命钩子 ↓↓↓
  componentDidMount() {
    HeaderActionCreater({
      type: 'TITLE',
      title: 'List'
    })(store.dispatch, store.getState);

    ListActionCreater()(store.dispatch, store.getState);
    const unsubscribe = store.subscribe(this.addListListener, this.addAnimationScope);
    this.setState({
      unsubscribe
    });
    const BS = new BScroll(this.refs.list_BScroll);
    
    BS.on('touchEnd', (e) => {
      const ulHeight = this.refs.list_ul.offsetHeight;
      const bottom = ulHeight - window.innerHeight;
      if (Math.abs(e.y) > bottom + 30) {
        this.addItem();
      }
    })
  }
  componentWillUnmount() {
    this.state.unsubscribe(this.addListListener, this.addAnimationScope);
  }
  // 生命钩子 ↑↑↑
  // 订阅回调 ↓↓↓
  addListListener() {
    this.setState({
      list: store.getState().List.list,
      animationScope: store.getState().List.animationScope
    });
  }
  addAnimationScope() {
    this.setState({
      animationScope: store.getState().List.animationScope
    });
  }
  // 订阅回调 ↑↑↑
  addItem() {
    store.dispatch({
      type: 'ADD_ITEM',
      list: store.getState().List.list
    })
  }
  getLis(list) {
    const animationScope = this.state.animationScope;
    const lis = list.map((item, i) => {
      if (animationScope[0] === 0) {
        setTimeout(() => {
          const liDOM = this.refs['li_' + i];
          liDOM && liDOM.classList.add('li_show');
        }, 200 * i)
      } else {
        if (i > animationScope[0] - 1) {
          setTimeout(() => {
            const liDOM = this.refs['li_' + i];
            liDOM && liDOM.classList.add('li_show');
          }, 200 * (i - animationScope[0]))
        }
      }

      return (
        <li key={i} ref={'li_' + i}>
          <div className="list_li_img"></div>
          <div className="list_li_title"></div>
          <div className="list_li_content"></div>
        </li>
      )
    })
    return lis;
  }
  render() {
    // li
    const lis = this.getLis(this.state.list);

    return (
      <div className="list_wrap">
        <div className="list_BScroll" ref="list_BScroll">
          <ul ref="list_ul">
            {lis}
          </ul>
        </div>
      </div>
    )
  }
}

export default List;