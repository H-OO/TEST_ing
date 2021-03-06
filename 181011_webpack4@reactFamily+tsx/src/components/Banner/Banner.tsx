import './Banner.scss';
import * as React from 'react';
import store from '../../store';
const { dispatch, getState, subscribe } = store;
import BannerActionCreater from '../../actions/BannerActionCreater';
import Tapper from '../../asset/self/tapper';

interface I_BannerReducer {
  type?: string;
  bannerList?: Array<string>;
}
interface I_state {
  bannerList?: Array<string>;
  banner__wrap_ref?: any;
  banner__main_ref?: any;
  banner__site_ref?: any;
  tapper?: any;
  unsubscribe?: (arg: () => void) => void;
}

class Banner extends React.Component {
  public constructor(arg: Object) {
    super(arg);
    this.changeBannerListHr = this.changeBannerListHr.bind(this);
    this.getLisHr = this.getLisHr.bind(this);
    const { bannerList }: I_BannerReducer = getState().BannerReducer;
    this.state = {
      bannerList,
      banner__wrap_ref: React.createRef(),
      banner__main_ref: React.createRef(),
      banner__site_ref: React.createRef()
    };
  }
  public changeBannerListHr(): void {
    const { bannerList }: I_BannerReducer = getState().BannerReducer;
    this.setState({
      bannerList
    });
  }
  public getLisHr(list: Array<string>): Object {
    // 遍历 main_lis
    const main_lis: JSX.Element[] = list.map((item, i) => {
      interface I_liStyle {
        backgroundColor: string;
      }
      const liStyle: I_liStyle = {
        backgroundColor: item
      };
      return <li key={i} style={liStyle}>{i}</li>;
    });

    // 遍历site_lis
    const site_lis: JSX.Element[] = list.map((item, i) => {
      let action: string = '';
      if (i === 0) {
        action = 'action';
      }
      return <li key={i} className={action}></li>;
    });
    return {
      main_lis,
      site_lis
    };
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
      bannerList: ['#9fa8da', '#c5e1a5', '#888', '#ce93d8']
    })(dispatch, getState);
  }
  public componentDidMount(): void {
    // 设置 main 容器宽度
    const { banner__wrap_ref }: I_state = this.state;
    // wrap 容器滑动事件初始化
    const banner__wrap = banner__wrap_ref.current;
    // 轮播插件实例化
    const tapper = new Tapper(banner__wrap);
    this.setState({
      tapper
    });
  }
  public componentWillUnmount(): void {
    const { unsubscribe, tapper }: I_state = this.state;
    unsubscribe(this.changeBannerListHr); // 取消订阅
    tapper.destroy();
  }
  public render(): Object {
    console.log('Banner..');
    const { bannerList, banner__wrap_ref, banner__main_ref, banner__site_ref }: I_state = this.state;
    const { main_lis, site_lis }: { main_lis?: JSX.Element; site_lis?: JSX.Element; } = this.getLisHr(bannerList);
    return (
      <div className='banner'>
        <div className='banner__wrap' ref={banner__wrap_ref}>
          <ul className='banner__main' ref={banner__main_ref}>
            {main_lis}
          </ul>
          <ol className='banner__site' ref={banner__site_ref}>
            {site_lis}
          </ol>
        </div>
      </div>
    );
  }
}

export default Banner;
