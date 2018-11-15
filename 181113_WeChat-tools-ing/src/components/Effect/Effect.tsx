import * as React from 'react';
import './Effect.scss';

// 全局仓库
import store from '../../store';

// state成员声明
interface I_state {
  mode?: string;
}

class Effect extends React.Component {
  // 构造函数
  public constructor(arg: any) {
    super(arg);
    // 局部仓库
    this.state = {
      mode: store.getState().ModeReducer.mode,
      device: store.getState().ControlReducer.device
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
    const { mode }: I_state = this.state;
    // console.log(mode);
  }
  // 渲染函数
  public render(): JSX.Element {
    return (
      <div className='Effect'>
        <div className="Effect__view"></div>
      </div>
    )
  }
}

export default Effect;