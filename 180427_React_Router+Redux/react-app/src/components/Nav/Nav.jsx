import './Nav.scss';

import React from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {
  render() {
    return (
      <div className="nav_wrap">
        <ul>
          <li><NavLink to='/tab/left'>Tab</NavLink></li>
          <li><NavLink to='/cart'>Cart</NavLink></li>
          <li><NavLink to='/list'>List</NavLink></li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
        </ul>
      </div>
    )
  }
}

export default Nav;