import React from 'react';
import NewItem from './NewItem';
import Action from '../../Action/Action';
import Store from '../../Store/Store';

class NewItemControl extends React.Component {
  // onClick事件的回调函数应该触发一个Action，Action需要先注册后使用
  constructor() {
    super();
    this.action = this.action.bind(this);
    this._changeEventCallback = this._changeEventCallback.bind(this);
    this.state = {
      items: Store.items
    };
  }
  // 组件挂载之后
  componentDidMount() {
    Store.addChangeListener('change', this._changeEventCallback);
  }
  // 组件销毁之前
  componentWillUnmount() {
    Store.removeChangeListener('change', this._changeEventCallback);
  }
  // change事件的回调执行函数 【可触发视图更新】
  _changeEventCallback() {
    this.setState({
      items: Store.getItems()
    })
  }
  // Action 交互触发该函数
  action() {
    const text = 'New Item'; // 交互行为产生出来的信息
    Action.addNewItemAction(text); // 调用方法将完整的Action传递给Dispatcher
  }

  render() {
    return (
      <NewItem items={this.state.items} onClick={this.action}/>
    )
  }
}

export default NewItemControl;