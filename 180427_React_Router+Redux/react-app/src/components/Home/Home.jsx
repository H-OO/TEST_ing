import './Home.sass';
import rem from '../../assets/rem';
import React from 'react';
import store from '../../store/store';
import HomeActionCreater from '../../actions/HomeActionCreater';

import Header from '../Header/Header';
import Tab from '../Tab/Tab';

class Home extends React.Component {
  constructor() {
    super();
    this.handler = this.handler.bind(this);
    this.changeListener = this.changeListener.bind(this);
    this.state = {
      text: store.getState().Home.text
    };
  }
  componentWillMount() {
    rem();
  }
  componentDidMount() {
    store.subscribe(this.changeListener);
  }
  changeListener() {
    this.setState({
      text: store.getState().Home.text
    });
  }
  handler() {
    HomeActionCreater()(store.dispatch, store.getState)
  }
  render() {
    return (
      <div>
        <Header />
        <Tab />
        <h3 className='title_color'>Home</h3>
        <div>{this.state.text}</div>
        <button onClick={this.handler}>GET_DATA</button>
      </div>
    )
  }
}

export default Home;