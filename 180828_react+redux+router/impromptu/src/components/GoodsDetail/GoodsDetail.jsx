import React, { Component } from 'react';
class GoodsDetail extends Component {
  constructor() {
    super();
    this.pathJump = this.pathJump.bind(this);
  }
  pathJump() {
    this.props.history.goBack();
  }
  render() {
    const {id} = this.props.match.params;
    return (
      <div>
        <div>GoodsDetail</div>
        <div>{id}</div>
        <button onClick={this.pathJump}>上一页</button>
      </div>
    )
  }
}

export default GoodsDetail;