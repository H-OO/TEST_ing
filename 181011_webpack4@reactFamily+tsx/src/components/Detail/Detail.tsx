import * as React from 'react';

class Detail extends React.Component {
  public constructor(arg: object) {
    super(arg);
    this.state = {
      id: ''
    };
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
  public render(): object {
    console.log('Detail..');
    interface I_state {
      id?: string
    }
    const { id }: I_state = this.state;
    return (
      <div className='detail'>
        <div>{id}</div>
      </div>
    )
  }
}

export default Detail;
