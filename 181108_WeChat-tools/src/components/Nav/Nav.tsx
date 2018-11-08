import * as React from 'react';
import './Nav.scss';

import { mode } from '../../asset/device';

import store from '../../store';
const { dispatch, getState } = store;

import NavActionCreater from '../../actions/NavActionCreater';

interface I_state {
  nav__main_ref?: any;
  currentMode?: any;
}

class Nav extends React.Component {
  constructor(arg: Object) {
    super(arg);
    this.getNavList = this.getNavList.bind(this);
    this.clickHr = this.clickHr.bind(this);
    this.state = {
      nav__main_ref: React.createRef()
    };
  }
  clickHr(e: any) {
    e.stopPropagation();
    const { target }: { target: HTMLElement } = e;
    let data: string = target.getAttribute('data-file-type'); // 获取自定义属性
    if (!data) {
      target.classList.toggle('action'); // 切换焦点
    } else {
      // 去除高亮
      const { nav__main_ref }: I_state = this.state;
      const { current: nav__main } = nav__main_ref;
      const _child = nav__main.children;
      for (let i = 0, l = _child.length; i < l; i++) {
        const olLis = _child[i].lastElementChild.children;
        for (let i = 0, l = olLis.length; i < l; i++) {
          olLis[i].classList.remove('action');
        }
      }
      // 唯一高亮
      target.classList.add('action'); // 切换焦点
      // 获取当前自定义属性
      console.log(data);
      NavActionCreater({
        type: 'Nav__mode',
        mode: data
      })(dispatch, getState);
    }
  }
  getNavList() {
    const list = mode.map((item, i) => {
      let _mode = '';
      if (item === '微信环境') {
        _mode = 'wx-';
      } else if (item === '全屏环境') {
        _mode = 'full-';
      }
      return (
        <li key={i}>
          {item}
          <ol>
            <li data-file-type={`${_mode}img`}>图片</li>
            <li data-file-type={`${_mode}video`}>视频</li>
          </ol>
        </li>
      );
    });
    return list;
  }
  render() {
    const { nav__main_ref }: I_state = this.state;
    const lis = this.getNavList();
    return (
      <div className="nav">
        <ul className="nav__main" onClick={this.clickHr} ref={nav__main_ref}>
          {lis}
        </ul>
      </div>
    );
  }
}

export default Nav;
