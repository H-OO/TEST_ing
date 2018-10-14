import * as React from 'react';

class Detail extends React.Component {
  public constructor(arg: object) {
    super(arg);
    this.backHr = this.backHr.bind(this);
    this.state = {
      id: ''
    };
  }
  public backHr(): void {
    window.history.back();
  }
  public componentWillMount(): void {
    interface I_props {
      params? :object;
      [propName: string]: any
    }
    const { params }: I_props = this.props;
    interface I_params {
      id?: object
    }
    const { id }: I_params = params;
    this.setState({
      id
    });
  }
  public render() {
    console.log('Detail..');
    console.log(this.state);
    interface I_state {
      id?: string
    }
    const { id }: I_state = this.state;
    return (
      <div className='detail'>
        <h2>Detail</h2>
        <div>{id}</div>
        <br/>
        <button onClick={this.backHr}>back</button>
      </div>
    )
  }
}

export default Detail;
