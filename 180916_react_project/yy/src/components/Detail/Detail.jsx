import React, { Component } from 'react';
import { Link } from 'react-keeper';

class Detail extends Component {
  constructor() {
    super();
    this.state = {
      payload: 'init'
    };
    this.getDetail = this.getDetail.bind(this);
  }
  getDetail() {
    const {id} = this.props.params;
    this.setState({
      payload: id
    })
  }
  componentWillMount() {
    this.getDetail();
  }
  render() {
    const {payload} = this.state;
    return (
      <div>
        <h2>Home>List>Detail</h2>
        <h3>{payload}</h3>
        <div>
          <Link to='/'>to Home</Link>
        </div>
      </div>
    )
  }
}

export default Detail;
