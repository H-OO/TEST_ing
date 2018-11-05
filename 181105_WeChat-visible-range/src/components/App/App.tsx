import * as React from 'react';
import '../../asset/css/reset.css';
import './App.scss';
const { HashRouter, Route } = require('react-keeper');
import Home from '../Home/Home';

class App extends React.Component {
  public render(): Object {
    return (
      <HashRouter>
        <div className='App'>
          <Route component={Home} path='/>' index />
        </div>
      </HashRouter>
    );
  }
}

export default App;
