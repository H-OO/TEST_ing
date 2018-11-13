import * as React from 'react';
import './Mode.scss';
// device
import { mode } from '../../asset/device';

// 局部仓库成员接口声明
interface I_state {
  lis?: Array<JSX.Element>;
}

class Mode extends React.Component {
  public constructor(arg: any) {
    super(arg);
    // 方法私有化
    this.lisEle = this.lisEle.bind(this);
    this.liAction = this.liAction.bind(this);
    // 局部仓库
    this.state = {
      lis: []
    };
  }
  // 生命钩子-挂载之前
  public componentWillMount() {
    // 执行-获取li
    this.lisEle();
  }
  // 获取li
  public lisEle(): void {
    // 遍历
    const lis: Array<JSX.Element> = mode.map((item, i) => {
      return <li key={i}>{item}</li>;
    });
    // 同步到局部仓库
    this.setState({
      lis
    })
  }
  // li点击高亮
  public liAction(e: any): void {
    
  }
  // 渲染
  public render(): JSX.Element {
    const { lis }: I_state = this.state;
    return (
      <div className="Mode">
        <ul onClick={this.liAction}>{lis}</ul>
      </div>
    );
  }
}

export default Mode;
