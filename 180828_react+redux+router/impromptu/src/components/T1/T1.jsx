import React, { Component } from 'react';

class T1 extends Component {
  constructor () {
    super();
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      content: 'xx'
    };
  }
  clickHandler () {
    // this.setState({
    //   content: 'x1'
    // })
  }
  render () {
    return (
      <div>
        <div>【T1】</div>
        <div>{content}</div>
        <button onClick={this.clickHandler}>setState</button>
      </div>
    )
  }
}

export default T1;
