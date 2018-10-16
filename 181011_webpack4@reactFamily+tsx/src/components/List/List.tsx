import './List.scss';
import * as React from 'react';
import { CacheLink } from 'react-keeper'; 
import store from '../../store';
const { dispatch, getState, subscribe } = store;
import ListActionCreater from '../../actions/ListActionCreater';
// import * as Hammer from 'hammerjs';
import BScroll from 'better-scroll';

interface I_state {
  list?: Array<number>;
  random?: number;
  list__wrap_ref? : any;
  unsubscribe?: (arg: () => void) => void;
}
interface I_ListReducer {
  list?: Array<number>;
}

class List extends React.Component {
  public constructor(arg: Object) {
    super(arg);
    this.changeListHr = this.changeListHr.bind(this);
    this.getLisHr = this.getLisHr.bind(this);
    const { list }: I_ListReducer = getState().ListReducer;
    this.state = {
      list,
      random: Math.random() * 100 >> 0,
      list__wrap_ref: React.createRef()
    };
  }
  public changeListHr(): void {
    // 推送回调
    console.log('订阅推送回调..');
    const { list }: I_ListReducer = getState().ListReducer;
    this.setState({
      list
    });
  }
  public getLisHr(list: Array<any>): JSX.Element[] {
    const lis: JSX.Element[] = list.map((item, i) => {
      return (
        <li className='list__item' key={i}>
          <CacheLink to={`/detail/${item}`}>
            <div className='list__item__l'>
              <div className="list__item__l__head"></div>
            </div>
            <div className='list__item__r'>
              <div className="list__item__r__title"></div>
              <div className="list__item__r__explain"></div>
            </div>
          </CacheLink>
        </li>
      )
    });
    return lis;
  }
  public componentWillMount(): void {
    // 订阅
    const unsubscribe = subscribe(this.changeListHr);
    this.setState({
      unsubscribe
    });
    // 发布初始值
    ListActionCreater({
      type: 'GET_LIST',
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    })(dispatch, getState);
  }
  public componentDidMount(): void {
    const { list__wrap_ref }: I_state = this.state;
    const listScroll =  new BScroll(list__wrap_ref.current, {
      click: true // 允许点击事件
    });
    // refresh() 当列表长度改变时触发BScroll重新计算
    console.log(listScroll);
  }
  public componentWillUnmount(): void {
    // 退订
    const { unsubscribe }: I_state = this.state;
    unsubscribe(this.changeListHr);
  }
  public render() {
    console.log('List render..');
    const { list }: I_ListReducer = getState().ListReducer;
    const lis = this.getLisHr(list);
    const { list__wrap_ref, random }: I_state = this.state;
    return (
      <div className='list'>
        <div className='list__wrap' ref={list__wrap_ref}>
          <ul className='list__main'>
          <li className='list__item'>
            随机数: { random }
          </li>
            {lis}
          </ul>
        </div>
      </div>
    );
  }
}

export default List;
