import './Banner.scss';
import * as React from 'react';
import store from '../../store';
const { dispatch, getState, subscribe } = store;
import BannerActionCreater from '../../actions/BannerActionCreater';
import * as Hammer from 'hammerjs';

interface I_BannerReducer {
  type?: string;
  bannerList?: Array<string>;
}
interface I_state {
  bannerList?: Array<string>;
  banner__main_ref?: any;
  unsubscribe?: (arg: () => void) => void;
}

class Banner extends React.Component {
  public constructor(arg: object) {
    super(arg);
    this.changeBannerListHr = this.changeBannerListHr.bind(this);
    this.getBannerListHr = this.getBannerListHr.bind(this);
    const { bannerList }: I_BannerReducer = getState().BannerReducer;
    this.state = {
      bannerList,
      banner__main_ref: React.createRef()
    };
  }
  public changeBannerListHr(): void {
    const { bannerList }: I_BannerReducer = getState().BannerReducer;
    this.setState({
      bannerList
    });
  }
  public getBannerListHr(list: Array<string>): JSX.Element[] {
    // 遍历 lis
    const lis: JSX.Element[] = list.map((item, i) => {
      interface I_liStyle {
        backgroundColor: string;
      }
      const liStyle: I_liStyle = {
        backgroundColor: item
      };
      return <li key={i} style={liStyle} />;
    });
    return lis;
  }
  public componentWillMount(): void {
    // 订阅
    const unsubscribe = subscribe(this.changeBannerListHr);
    this.setState({
      unsubscribe
    });
    // 推送新状态
    BannerActionCreater({
      type: 'GET_BANNERLIST',
      bannerList: ['#90caf9', '#9fa8da', '#c5e1a5', '#80cbc4', '#ce93d8']
    })(dispatch, getState);
  }
  public componentDidMount(): void {
    // 设置 main 容器宽度
    const { bannerList, banner__main_ref }: I_state = this.state;
    const len = bannerList.length;
    const banner__main = banner__main_ref.current;
    banner__main.style.width = len * 100 + '%';
  }
  public componentWillUnmount(): void {
    const { unsubscribe }: I_state = this.state;
    unsubscribe(this.changeBannerListHr);
  }
  public render(): object {
    console.log('Banner..');
    const { bannerList, banner__main_ref }: I_state = this.state;
    const lis = this.getBannerListHr(bannerList);
    return (
      <div className="banner">
        <div className="banner__wrap">
          <ul className="banner__main" ref={banner__main_ref}>
            {lis}
          </ul>
        </div>
      </div>
    );
  }
}

export default Banner;
