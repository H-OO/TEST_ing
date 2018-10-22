import * as React from 'react';

interface I_test {
  a: () => void;
}

// import { t } from '../../asset/lib/t';
// console.log(t);

class Try extends React.Component {
  render(): JSX.Element {
    return (
      <div className='try'>
        Try
      </div>
    )
  }
}

export default Try;
