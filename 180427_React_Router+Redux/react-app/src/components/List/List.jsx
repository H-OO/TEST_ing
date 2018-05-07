import './List.scss';
import React from 'react';

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      list: ['1', '2', '3']
    };
  }
  render() {
    let list = () => {
      return (
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      )
    };
    return (
      <div className="list_wrap">
        
      </div>
    )
  }
}

export default List;