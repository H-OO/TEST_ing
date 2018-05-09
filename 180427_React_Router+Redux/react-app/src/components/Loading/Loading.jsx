import './Loading.scss';
import React from 'react';

import store from '../../store/store';
import HeaderActionCreater from '../../actions/Header/HeaderActionCreater';
import LoadingActionCreater from '../../actions/Loading/LoadingActionCreater';


class Loading extends React.Component {
  constructor() {
    super();
    this.loading = this.loading.bind(this);
    this.addTextListener = this.addTextListener.bind(this);
    this.state = {
      text: store.getState().Loading.text,
      unsubscribe: null
    };
  }
  componentDidMount() {
    HeaderActionCreater({
      type: 'TITLE',
      title: 'Loading'
    })(store.dispatch, store.getState);
    const unsubscribe = store.subscribe(this.addTextListener);
    this.setState({
      unsubscribe
    });
  }
  componentWillUnmount() {
    LoadingActionCreater({
      type: 'LOADING_TEXT',
      text: 'Get Something!',
    })(store.dispatch, store.getState);
    this.state.unsubscribe(this.addTextListener);
  }
  addTextListener() {
    this.setState({
      text: store.getState().Loading.text
    });
  }
  loading() {
    const loadingBarDom = this.refs.loading_bar;
    const loadingProgressDom = this.refs.loading_progress;

    // 盒子添加动画
    loadingBarDom.classList.add('loading_bar_animation');
    // 盒子收缩后出现进度条
    loadingProgressDom.classList.add('loading_progress_animation');

    // 发送HTTP请求 获取数据 当完成加载后切换成 100
    loadingProgressDom.addEventListener('animationend', e => {
      if (e.animationName === 'loading_progress_100') {
        setTimeout(() => {
          loadingBarDom.style.animationName = 'loading_bar_100';
          LoadingActionCreater({
            type: 'LOADING_TEXT',
            text: 'Success!',
          })(store.dispatch, store.getState);
        }, 500)
      }
    })

    loadingBarDom.addEventListener('animationend', e => {
      if (e.animationName === 'loading_bar_100') {
        loadingBarDom.classList.remove('loading_bar_animation');
        loadingBarDom.style.animationName = '';
        loadingProgressDom.classList.remove('loading_progress_animation');
        loadingProgressDom.style.animationName = '';
        loadingProgressDom.style.animationDelay = '';
      }
    });

    setTimeout(() => {
      loadingProgressDom.style.animationName = 'loading_progress_100';
      loadingProgressDom.style.animationDelay = '0s';
    }, 3000)
  }
  render() {
    return (
      <div className="loading_wrap">
        <div className="loading_container">
          <div className="loading_bar" ref="loading_bar" onClick={this.loading}>
            <div className="loading_text">{this.state.text}</div>
            <div className="loading_progress" ref="loading_progress"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Loading;