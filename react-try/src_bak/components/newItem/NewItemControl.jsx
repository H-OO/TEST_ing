import React from 'react';
import NewItem from './NewItem';
import Store from '../../store/Store';
import Action from '../../action/Action';
console.log(Action);


class NewItemControl extends React.Component {
  constructor() {
    super();
    this.addNewItemHandler = this.addNewItemHandler.bind(this);
    this._onchange = this._onchange.bind(this);
    this.state = {
      items: Store.items
    };
  }

  // 挂载之后
  componentDidMount() {
    Store.addChangeListener(this._onchange);
  }
  // 销毁之前
  componentWillUnmount() {
    Store.removeAllListeners(this._onchange);
  }
  _onchange() {
    this.setState({
      items: Store.getAll()
    })
  }

  // action行为
  addNewItemHandler() {
    Action.addNewItem('new111')
  }
  // 渲染
  render() {
    return <NewItem items={this.state.items} onClick={this.addNewItemHandler}/>
  }
}

export default NewItemControl;