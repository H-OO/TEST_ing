import React from 'react';
import './Tab.sass';

class Tab extends React.Component {
  render() {
    return (
      <div className='tab_wrap'>
        <div className='tab_menu_left'>Left</div>
        <div className='tab_menu_right'>Right</div>
      </div>
    )
  }
}

export default Tab;