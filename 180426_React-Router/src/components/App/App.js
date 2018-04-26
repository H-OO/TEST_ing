import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Prompt,
  Switch,
  Redirect
} from 'react-router-dom';

import Home from '../Home/Home';
import About from '../About/About';
import Topics from '../Topics/Topics';

import './App.css';

const activeFunc = (match, location) => {
  console.log(match);
  console.log(location);
};

// const getConfirmation = (a, b) => {
//   console.log(a);
//   b(false);
// }

class App extends React.Component {
  constructor() {
    super();
    this.innerRef = this.innerRef.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      login: false,
      text: 'Login'
    };
  }
  innerRef(node) {
    // console.log(node);
  }
  login() {
    this.setState({
      login: !this.state.login,
      text: !this.state.login ? 'Sign Out' : 'Login'
    })
  }
  render() {
    console.log(this.state.login);
    
    return (
      // <Router keyLength={12} getUserConfirmation={getConfirmation}>
      <Router keyLength={12}>
        <div>
          <ul>
            <li>
              <button onClick={this.login}>{this.state.text}</button>
            </li>
            <li>
              <NavLink
                strict
                to="/"
                activeClassName="selected"
                isActive={activeFunc}
              >
                Home
              </NavLink>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to={
                {
                  pathname: "/topics",
                  state: {
                    login: this.state.login
                  }
                }
              }>Topics</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics}/>
          <Switch>
            <Redirect from="/test" to="/about" />
          </Switch>

          <Prompt
            when={false}          
            message={location => {
              console.log('__location__');
              console.log('当前：' + window.location.pathname);
              console.log('跳转后：' + location.pathname);
              // location.pathname === ''
              return 'xxxxxx';
            }}
          />
        </div>
      </Router>
    );
  }
}

export default App;
