import * as React from 'react';
import './Home.scss';

// 引入组件
import Mode from '../Mode/Mode';
import Effect from '../Effect/Effect';
import Control from '../Control/Control';

class Home extends React.Component {
  public constructor(arg: any) {
    super(arg);
  }
  public render(): JSX.Element {
    return (
      <div className="home">
        <Mode />
        <Effect />
        <Control />
      </div>
    );
  }
}

export default Home;
