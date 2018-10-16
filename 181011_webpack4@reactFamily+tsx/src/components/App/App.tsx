import * as React from 'react';
import '../../asset/css/reset.css';
import './App.scss';
const { HashRouter, Route } = require('react-keeper');
import Rem from '../../asset/lib/rem';
import Home from '../Home/Home';
import List from '../List/List';
import Detail from '../Detail/Detail';
import TopBar from '../TopBar/TopBar';
import Banner from '../Banner/Banner';

class App extends React.Component {
  public componentWillMount(): void {
    const rem = new Rem();
    rem.init();
  }
  public render(): object {
    console.log('App render..');
    return (
      <HashRouter>
        <div className='App'>
          <Route component={TopBar} path='/' />
          <Route component={Home} path='/>' index />
          <Route component={List} path='/list' />
          <Route component={Detail} path='/detail/:id' />
          <Route component={Banner} path='/banner' />
        </div>
      </HashRouter>
    );
  }
}

export default App;
