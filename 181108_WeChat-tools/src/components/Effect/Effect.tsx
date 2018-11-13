import * as React from 'react';
import './Effect.scss';

import store from '../../store';
import { wx } from '../../asset/device';

interface I_state {
  currentMode?: string;
  currentPhone?: string;
  visibleRef?: React.Ref<HTMLDivElement>;
}

class Effect extends React.Component {
  constructor(arg: any) {
    super(arg);
    this.state = {
      currentMode: store.getState().NavReducer.mode,
      currentPhone: store.getState().MenuReducer.phone,
      visibleRef: React.createRef()
    };
    this.getVisibleSize = this.getVisibleSize.bind(this);
    this.callCurrentPhone = this.callCurrentPhone.bind(this);
  }
  callCurrentPhone() {
    const currentPhone: string = store.getState().MenuReducer.phone;
    this.setState({
      currentPhone
    });
    this.getVisibleSize();
    // console.log(currentPhone);
  }
  getVisibleSize() {
    const { visibleRef }: I_state = this.state;
    const { current: visibleNode }: any = visibleRef;
    const currentPhone: string = store.getState().MenuReducer.phone;
    const _wx: any = wx;
    for (let k in _wx) {
      if (k === currentPhone) {
        const [w, h] = _wx[k];
        visibleNode.style.width = w + 'px';
        visibleNode.style.height = h + 'px';
        const x: number = (500 - w - 20) / 2;
        const y: number = (800 - h - 20) / 2;
        visibleNode.style.transform = `translate(${x}px,${y}px)`;
      }
    }
  }
  componentWillMount() {
    const unsubscribe = store.subscribe(this.callCurrentPhone);
    this.setState({
      unsubscribe
    });
  }
  componentDidMount() {
    this.getVisibleSize();
  }
  render() {
    const { visibleRef }: I_state = this.state;
    return (
      <div className="effect">
        <div className="effect__visible" ref={visibleRef}>可视区</div>
      </div>
    );
  }
}

export default Effect;
