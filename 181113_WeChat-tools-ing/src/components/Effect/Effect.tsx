import * as React from 'react';
import './Effect.scss';

import { wx, full } from '../../asset/device';

// 全局仓库
import store from '../../store';

// state成员声明
interface I_state {
  wx?: { [propName: string]: Array<number> };
  mode?: string;
  device?: string;
  viewRef?: React.Ref<HTMLDivElement>
}

class Effect extends React.Component {
  // 构造函数
  public constructor(arg: any) {
    super(arg);
    // 局部仓库
    this.state = {
      wx,
      mode: store.getState().ModeReducer.mode,
      device: store.getState().ControlReducer.device,
      viewRef: React.createRef()
    };
    // 私有化方法
    this.callState = this.callState.bind(this);
  }
  // call-mode
  public callState() {
    const mode: string = store.getState().ModeReducer.mode;
    const device: string = store.getState().ControlReducer.device;
    console.log('Effect mode → ' + mode);
    console.log('Effect device → ' + device);
    // 同步到局部仓库
    this.setState({
      mode,
      device
    });
  }
  // 生命钩子-挂载之前
  public componentWillMount() {
    // 订阅全局仓库
    const unsubscribe = store.subscribe(this.callState);
    this.setState({
      unsubscribe
    });
  }
  // 生命钩子-挂载之后
  public componentDidMount() {
    // viewRef 设置对应样式
    const { viewRef, mode }: I_state = this.state;
    const { current: viewNode }: any = viewRef;
    console.log(viewNode);
    console.log(mode);
    console.log(store.getState().ControlReducer.device);
    if (mode === 'wx') {
      console.log(wx);
      // viewNode.style.width = wx[device]
    } else {
      console.log(full);
    }
  }
  // 渲染函数
  public render(): JSX.Element {
    const { viewRef }: I_state = this.state;
    return (
      <div className='Effect'>
        <div className="Effect__view" ref={viewRef}></div>
      </div>
    )
  }
}

export default Effect;
