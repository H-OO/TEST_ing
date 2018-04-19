/**
 * Control
 */
import React from 'react';
import NewItem from './NewItem';
import Store from '../../Store/Store';
import Action from '../../Action/Action';

class NewItemControl extends React.Component {
  constructor() {
    super();
    this._change = this._change.bind(this);
    this.addNewItemAction = this.addNewItemAction.bind(this);
    this.state = {
      items: Store.items
    };
  }
  _change() {
    this.setState({
      items: Store.items
    })
  }
  addNewItemAction() {
    const text = 'New Item';
    Action.addNewItemAction(text);
  }
  componentDidMount() {
    Store.addChangeListener(this._change);
  }
  componentWillUnmount() {
    Store.removeChangeListener(this._change);
  }
  render() {
    return (
      <NewItem items={this.state.items} onClick={this.addNewItemAction} />
    )
  }
}

export default NewItemControl;