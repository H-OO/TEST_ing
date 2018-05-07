import './Home.scss';
import rem from '../../assets/rem';

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Nav from '../Nav/Nav';
import Tab from '../Tab/Tab';
import Left from '../Left/Left';
import Right from '../Right/Right';
import Cart from '../Cart/Cart';
import List from '../List/List';

class Home extends React.Component {
  componentWillMount() {
    rem();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="home_wrap">
          <Route exact path='/' component={Nav} />
          <Route path='/tab' component={Tab} />
          <Route exact path='/tab/left' component={Left} />
          <Route exact path='/tab/right' component={Right} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/list' component={List} />
        </div>
      </BrowserRouter>
    )
  }
}

export default Home;