import * as React from 'react';

import Button from '@material-ui/core/Button';

class Test1 extends React.Component {
  public render(): JSX.Element {
    return (
      <div className="test1">
        <Button variant="contained" color="primary">
          test1
        </Button>
      </div>
    )
  }
}

export default Test1;
