import * as React from 'react';
import './Home.scss';

import Nav from '../Nav/Nav';
import Effect from '../Effect/Effect';
import Menu from '../Menu/Menu';

interface I_state {
  home_ref?: any;
}

class Home extends React.Component {
  constructor(arg: Object) {
    super(arg);
    this.center = this.center.bind(this);
    this.state = {
      home_ref: React.createRef()
    };
  }
  componentDidMount() {
    // this.center();
    // window.addEventListener('resize', () => {
    //   this.center();
    // }, false);
  }
  // 居中
  center() {
    const winH = window.innerHeight;
    const { home_ref }: I_state = this.state;
    const { current: home }: { current: HTMLElement } = home_ref;
    const move = (winH - home.clientHeight) / 2;
    home.style.transform = `translateY(${move}px)`;
  }
  render(): JSX.Element {
    // console.log('Home render..');
    const { home_ref }: I_state = this.state;
    return (
      <div className="home" ref={home_ref}>
        <Nav />
        <Effect />
        <Menu />
      </div>
    );
  }
}

export default Home;
