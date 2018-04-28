import './Home.scss';
import rem from '../../assets/rem';
import React from 'react';

import Tab from '../Tab/Tab';
import Left from '../Left/Left';
import Right from '../Right/Right';

import { BrowserRouter, Route } from 'react-router-dom';

class Home extends React.Component {
  componentWillMount() {
    rem();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="home_wrap">
          <Tab />
          <Route path='/left' component={Left} />
          <Route path='/right' component={Right} />
        </div>
      </BrowserRouter>
    )
  }
}

export default Home;