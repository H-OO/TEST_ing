/**
 * NewItem 视图M
 * @param items Control组件传入 this.props.items
 * @param onClick Control组件传入 this.props.onClick
 */

import React from 'react';

class NewItem extends React.Component {
  render() {
    const items = this.props.items;
    const itemsHTML = items.map((v, i) => {
      return <div key={i}>{v}</div>
    });
    return (
      <div>
        <button onClick={this.props.onClick}>addNewItem</button>
        <div>{itemsHTML}</div>
      </div>
    )
  }
}

export default NewItem;