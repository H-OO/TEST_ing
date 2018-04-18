import React from 'react';

class NewItem extends React.Component {
  render() {
    const items = this.props.items;
    let itemsHTML = items.map((v, i) => {
      return <div key={i}>{v}</div>;
    });
    return (
      <div>
        <button onClick={this.props.onClick}>addNewItem</button>
        <div className="items">{itemsHTML}</div>
      </div>
    );
  }
}

export default NewItem;
