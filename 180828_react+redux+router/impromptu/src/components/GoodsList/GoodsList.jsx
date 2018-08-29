import React, { Component } from 'react';
import store from '../../store/store';
import GoodsListActionCreater from '../../actions/GoodsListActionCreater';
import { Link } from 'react-router-dom';
class GoodsList extends Component {
  constructor() {
    super();
    this.stateChange = this.stateChange.bind(this);
    this.getList = this.getList.bind(this);
    this.goBack = this.goBack.bind(this);
    this.state = {
      list: store.getState().GoodsList.list
    };
  }
  stateChange() {
    this.setState({
      list: store.getState().GoodsList.list
    });
  }
  getList(list) {
    return list.map((item, i) => {
      return (
        <li key={i}>
          <Link to={'/goodsdetail/' + item}>{item}</Link>
        </li>
      )
    })
  }
  goBack() {
    this.props.history.goBack();
  }
  componentWillMount() {
    const unsubscribe = store.subscribe(this.stateChange);
    this.setState({
      unsubscribe
    });
    GoodsListActionCreater({
      type: 'GoodsList_init',
      list: []
    })(store.dispatch, store.getState);
  }
  componentWillUnmount() {
    this.state.unsubscribe(this.stateChange);
  }
  render() {
    const list = this.getList(this.state.list);
    return (
      <div>
        <div>GoodsList</div>
        <ul>
          {list}
        </ul>
        <button onClick={this.goBack}>上一页</button>
      </div>
    )
  }
}
export default GoodsList;