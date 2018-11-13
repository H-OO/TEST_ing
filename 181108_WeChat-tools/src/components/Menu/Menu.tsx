import * as React from 'react';
import './Menu.scss';
import { list } from '../../asset/device';
import store from '../../store';
import MenuActionCreater from '../../actions/MenuActionCreater';

interface I_state {
  mode?: string;
}

class Menu extends React.Component {
  constructor(arg: Object) {
    super(arg);
    this.getOptions = this.getOptions.bind(this);
    this.selectChangeHr = this.selectChangeHr.bind(this);
    this.fileChangeHr = this.fileChangeHr.bind(this);
    this.callStateMode = this.callStateMode.bind(this);
    this.state = {
      mode: store.getState().NavReducer.mode
    };
  }
  getOptions() {
    const options: any = [];
    const _list: any = list;
    for (let k in _list) {
      options.push(
        <option value={k} key={k}>
          {_list[k]}
        </option>
      );
    }
    return options;
  }
  selectChangeHr(e: React.ChangeEvent<HTMLSelectElement>) {
    const { currentTarget }: { currentTarget: HTMLSelectElement } = e;
    const { value }: { value: string } = currentTarget;
    MenuActionCreater({
      type: 'Menu__phone',
      phone: value
    })(store.dispatch, store.getState);
  }
  fileChangeHr(e: React.ChangeEvent<HTMLInputElement>) {
    const { currentTarget }: { currentTarget: HTMLInputElement } = e;
    const { files }: { files: FileList } = currentTarget;
    const file: File = files[0]; // 获取文件
    console.log(file);
    console.log(file.type);
    const { mode }: I_state = this.state;
    console.log(mode);
  }
  callStateMode() {
    this.setState({
      mode: store.getState().NavReducer.mode
    });
  }
  componentWillMount() {
    const unsubscribe = store.subscribe(this.callStateMode);
    this.setState({
      unsubscribe
    });
  }
  render() {
    // const {  }: I_state = this.state;
    const options: Array<JSX.Element> = this.getOptions();
    return (
      <div className="menu">
        <select
          onChange={this.selectChangeHr}
          className="menu__device-list"
          defaultValue="iPhoneX"
        >
          {options}
        </select>
        <input
          type="file"
          accept="image/*"
          className="menu__file"
          onChange={this.fileChangeHr}
        />
        <button className="menu__cut">裁剪显示</button>
        <div className="menu__log">打印区</div>
      </div>
    );
  }
}

export default Menu;
