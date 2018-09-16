import React, { Component } from 'react';
import { CacheLink } from 'react-keeper';

class List extends Component {
  constructor() {
    super();
    this.state = {
      num: Math.round(Math.random() * 100),
      list: ['first', 'second', 'third']
    };
  }
  getList({list}) {
    return list.map((item, i) => {
      return (
        <li key={i}>
          <CacheLink to={`/detail/${item}`}>{item}</CacheLink>
        </li>
      )
    })
  }
  render() {
    const {num} = this.state;
    const list = this.getList(this.state);
    return (
      <div>
        <h2>Home>List</h2>
        <div>随机数：【 {num} 】</div>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}

export default List;