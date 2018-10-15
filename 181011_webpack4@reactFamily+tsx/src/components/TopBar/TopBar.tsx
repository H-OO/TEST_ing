import './TopBar.scss';
import * as React from 'react';
import store from '../../store';
const { dispatch, getState, subscribe } = store;

class TopBar extends React.Component {
  public constructor(arg: object) {
    super(arg);
    this.back = this.back.bind(this);
  }
  public back(): void {
    window.history.back();
  }
  public render() {
    return (
      <div className='top-bar'>
        <div className="top-bar__arrows__wrap" onClick={this.back}>
          <div className="top-bar__arrows"></div>
        </div>
        <div className="top-bar__menu">···</div>
      </div>
    )
  }
}

export default TopBar;
