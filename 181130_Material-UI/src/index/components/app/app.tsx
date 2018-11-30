import * as React from 'react';
import './app.scss';
const logo = require('../../images/logo.svg');
import * as _ from 'lodash';
import * as axios from 'axios';
// import * as echarts from 'echarts';
// import { Button } from '@material-ui/core';
import Button from '@material-ui/core/Button';

interface I_state {
  asyncScript?: string;
}

class App extends React.Component {
  public constructor(arg: any) {
    super(arg);
    this.getAsyncScript = this.getAsyncScript.bind(this); // 方法私有化
    // 局部仓库
    this.state = {
      asyncScript: ''
    };
  }
  // 获取异步脚本
  public getAsyncScript(): void {
    // 抽离异步脚本：无效方式【不能抽离】
    // import('../../tools/asyncScript').then((data) => {
    //   console.log(data);
    // })
    // ==============================================
    // 抽离异步脚本：有效方式【可抽离】
    const _require: { [x: string]: any } = require; // 为`ensure`添加声明
    _require.ensure(
      [],
      () => {
        const asyncScript = require('../../tools/asyncScript');
        const { default: data } = asyncScript;
        this.setState({
          asyncScript: data.test
        });
      },
      '_asyncScript'
    );
    // `_asyncScript`为抽离包的文件名
    // ==============================================
  }
  public componentWillMount(): void {
    console.log(_.join(['module', 'loaded!'], ' '));
    console.log(axios);
    // console.log(echarts);
  }
  public render(): JSX.Element {
    const { asyncScript }: I_state = this.state;
    return (
      <div className="app">
        <img src={logo} alt="" className="logo" height="80" />
        <div>react-tsx</div>
        <br />
        <button onClick={this.getAsyncScript}>asyncScript</button>
        <br />
        <div>{asyncScript}</div>
        <br />
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}

export default App;
