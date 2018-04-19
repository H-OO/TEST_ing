/**
 * 只负责获取视图相关的数据信息进行渲染
 * 控制器将提供视图相关的数据信息与onClick事件使用的回调函数
 */

import React from 'react';

class NewItem extends React.Component {
  render() {
    const items = this.props.items; // 由Control提供
    const itemsHTML = items.map((v, i) => {
      return <div key={i}>{v}</div>
    });
    return (
      <div>
        <button onClick={this.props.onClick}>add-new-item</button>
        <div>{itemsHTML}</div>
      </div>
    )
  }
}

export default NewItem;