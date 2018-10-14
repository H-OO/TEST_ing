import './List.scss';
import * as React from 'react';
const { CacheLink } = require('react-keeper');
import store from '../../store';
const { dispatch, getState, subscribe } = store;
import ListActionCreater from '../../actions/ListActionCreater';

interface I_state {
  list?: Array<number>;
  random?: number;
  unsubscribe?: (arg: () => void) => void;
}
interface I_ListReducer {
  list?: Array<number>;
}

class List extends React.Component {
  public constructor(arg: object) {
    super(arg);
    this.changeListHr = this.changeListHr.bind(this);
    this.getLisHr = this.getLisHr.bind(this);
    const { list }: I_ListReducer = getState().ListReducer;
    this.state = {
      list,
      random: Math.random() * 100 >> 0
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
  public getLisHr(list: Array<number>): Array<any> {
    const lis: Array<any> = list.map((item, i) => {
      return (
        <li key={i}>
          <CacheLink to={`/detail/${item}`}>{item}</CacheLink>
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
      list: [1, 2, 3, 4]
    })(dispatch, getState);
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
    
    const { random }: I_state = this.state;
    return (
      <div className="list">
        <div>【List】</div>
        <div>随机数: { random }</div>
        <ul>
          {lis}
        </ul>
      </div>
    );
  }
}

export default List;
