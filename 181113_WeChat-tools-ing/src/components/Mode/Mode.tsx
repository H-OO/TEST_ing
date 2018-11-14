import * as React from 'react';
import './Mode.scss';
// device
import { mode } from '../../asset/device';
// const _mode

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
    // const lis: Array<JSX.Element> = mode.map((item, i) => {
    //   return (
    //     <li className={i === 0 ? 'action' : ''} key={i} data-mode>
    //       {item}
    //     </li>
    //   );
    // });
    const lis: Array<JSX.Element> = [];
    for (let k in mode) {
      lis.push(
        <li className={k === 'wx' ? 'action' : ''} data-mode={k} key={k}></li>
      )
    }
    // 同步到局部仓库
    this.setState({
      lis
    });
  }
  // li点击高亮
  public liAction(e: React.MouseEvent<HTMLUListElement>): void {
    const { currentTarget }: React.MouseEvent<HTMLUListElement> = e;
    const { children }: { children: HTMLCollection } = currentTarget; // 事件委托节点
    const target: HTMLLIElement = e.target as HTMLLIElement; // 目标节点
    // 移除所有高亮
    [].forEach.call(children, (item: HTMLLIElement) => {
      item.classList.remove('action');
    });
    // 目标节点高亮
    target.classList.add('action');
    // 打印自定义属性 `data-mode`

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
