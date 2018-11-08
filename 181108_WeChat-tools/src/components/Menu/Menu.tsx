import * as React from 'react';
import './Menu.scss';

import { list } from '../../asset/device';
import store from '../../store';
console.log(store.getState().NavReducer.mode);

interface I_state {
  deviceListRef?: React.Ref<HTMLSelectElement>
}

class Menu extends React.Component {
  constructor(arg: Object) {
    super(arg);
    this.getOptions = this.getOptions.bind(this);
    this.state = {
      deviceListRef: React.createRef()
    };
  }
  getOptions() {
    const options: any = [];
    const _list: any = list;
    for (let k in _list) {
      options.push(
        <option value={k} key={k}>{_list[k]}</option>
      );
    }
    return options;
  }

  componentDidMount() {
    
  }
  render() {
    const { deviceListRef }: I_state = this.state;
    const options: Array<JSX.Element> = this.getOptions();
    return (
      <div className="menu">
        <select className="menu__device-list" defaultValue="iPhoneX" ref={deviceListRef}>
          {options}
        </select>
        <input type="file" name="" className="menu__file" />
        <button className="menu__cut">裁剪显示</button>
        <div className="menu__log">打印区</div>
      </div>
    );
  }
}

export default Menu;
