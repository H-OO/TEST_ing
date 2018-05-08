import './List.scss';
import React from 'react';

import store from '../../store/store';
import ListActionCreater from '../../actions/List/ListActionCreater';

import BScroll from 'better-scroll';

class List extends React.Component {
  constructor() {
    super();
    this.addListListener = this.addListListener.bind(this);
    this.handler = this.handler.bind(this);
    this.state = {
      list: store.getState().List,
      unsubscribe: null,
      setAnimation: [0, 0]
    };
  }
  handler() {
    store.dispatch({
      type: 'ADD_ITEM',
      list: store.getState().List
    })
  }
  addListListener() {
    const setAnimation = this.state.setAnimation.map(item => {
      return item;
    });
    setAnimation.shift();
    setAnimation.push(store.getState().List.length);
    
    this.setState({
      list: store.getState().List,
      setAnimation
    });
  }
  componentDidMount() {
    ListActionCreater()(store.dispatch, store.getState);
    const unsubscribe = store.subscribe(this.addListListener);
    this.setState({
      unsubscribe
    });
    new BScroll(this.refs.list_BScroll);
  }
  componentWillUnmount() {
    this.state.unsubscribe(this.addListListener);
  }
  render() {
    // li
    const _lis = this.state.list;
    // console.log(_lis);
    // console.log(this.state.setAnimation);
    const setAnimation = this.state.setAnimation;    
    const lis = _lis.map((item, i) => {
      if (setAnimation[0] === 0) {
        setTimeout(() => {
          const liDOM = this.refs['li_' + i];
          liDOM && liDOM.classList.add('li_show');
        }, 200 * i)
      } else {
        if (i > setAnimation[0] - 1) {
          setTimeout(() => {
            const liDOM = this.refs['li_' + i];
            liDOM && liDOM.classList.add('li_show');
          }, 200 * (i - setAnimation[0]))
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

    return (
      <div className="list_wrap">
        <button onClick={this.handler}>ADD</button>
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