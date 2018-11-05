import * as React from 'react';
import './Home.scss';
import { device } from './device'; // 机型

class Home extends React.Component {
  public constructor(arg: Object) {
    super(arg);
    this.getDeviceSelectList = this.getDeviceSelectList.bind(this);
    this.state = {
      deviceList: React.createRef(),
      sizeW: React.createRef(),
      sizeH: React.createRef()
    };
  }
  public componentWillMount() {
    this.getDeviceSelectList();
  }
  getDeviceSelectList() {
    // console.log(device);
    const deviceList: any = device;
    const options = [];
    for(let name in deviceList) {
      let option: JSX.Element;
      if (name === 'iPhoneX') {
        option = (
          <option value={name} key={name}>{name}</option>
        );
      } else if (name === 'main1') {
        option = (
          <option value={name} key={name}>非全面屏主流机型</option>
        );
      } else {
        option = (
          <option value={name} key={name}>{name}</option>
        );
      }
      options.push(option);
    }
    return options;
  }
  public render(): Object {
    console.log('home..');
    const options = this.getDeviceSelectList();
    return (
      <div className="home">
        <div className="home__menu">
          <select className="home__device-list" defaultValue="iPhoneX">
            {options}
          </select>
          <div className="home__size">
            <span>尺寸: </span>
            <span className="home__size-w">宽</span>
            <span> x </span>
            <span className="home__size-h">高</span>
          </div>
        </div>
        <div className="home__effect"></div>
        <div className="home__file-btn">
          <input type="file"/>
        </div>
      </div>
    );
  }
}

export default Home;
