import * as React from 'react';
import './Control.scss';

import { list, wx } from '../../asset/device';

// 全局仓库
import store from '../../store';
// ActionCreater
import ControlActionCreater from '../../actions/ControlActionCreater';

// 局部仓库成员声明
interface I_state {
  list?: { [propName: string]: string };
  options?: Array<JSX.Element>;
  mode?: string;
}

class Control extends React.Component {
  // 构造函数
  public constructor(arg: any) {
    super(arg);
    // 局部仓库
    this.state = {
      list,
      options: [],
      mode: store.getState().ModeReducer.mode
    };
    // 方法私有化
    this.optionsEle = this.optionsEle.bind(this);
    this.selectValueChange = this.selectValueChange.bind(this);
    this.callState = this.callState.bind(this);
  }
  // 根据已知`list`获取`option`列表
  public optionsEle(): void {
    const { list, options }: I_state = this.state;
    // 遍历option加入数组中
    for (let k in list) {
      options.push(
        <option value={k} key={k}>{list[k]}</option>
      );
    }
    console.log('默认设备 → ' + options[0].props.value); // 获取默认值
    // 同步到局部仓库
    this.setState({
      options
    });
  }
  // 监听下拉列表value值
  public selectValueChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    const { mode }: I_state = this.state;
    const device: string = e.currentTarget.value;
    console.log('当前设备 → ' + device); // 当前选项
    console.log('当前模式 → ' + mode); // 当前模式
    // 派发当前设备
    ControlActionCreater({
      type: 'Control_device',
      device
    })(store.dispatch, store.getState);
  }
  // 全局仓库订阅回调
  public callState() {
    const { mode } = store.getState().ModeReducer;
    console.log('Control mode → ' + mode);
    this.setState({
      mode
    });
  }
  // 生命钩子-挂载之前
  public componentWillMount() {
    // 全局仓库订阅
    const unsubscribe = store.subscribe(this.callState);
    this.setState({
      unsubscribe
    });
    this.optionsEle();
    const { mode }: I_state = this.state;
    console.log('默认模式 → ' + mode);
  }
  // 渲染函数
  public render(): JSX.Element {
    const { options }: I_state = this.state;
    return (
      <div className='Control'>
        <select onChange={this.selectValueChange}>
          {options}
        </select>
        <br/>
        <input type="file"/>
      </div>
    )
  }
}

export default Control;
