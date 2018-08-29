import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Settings from '../Settings/Settings';
import GoodsList from '../GoodsList/GoodsList';
import GoodsDetail from '../GoodsDetail/GoodsDetail';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/settings' component={Settings} />
          <Route path='/goodslist' component={GoodsList} />
          <Route path='/goodsdetail/:id' component={GoodsDetail} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;