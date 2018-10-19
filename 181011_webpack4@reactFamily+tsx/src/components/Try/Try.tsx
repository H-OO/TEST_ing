import * as React from 'react';

interface I_test {
  a: () => void;
}
const test: I_test = require('./t');
console.log(test);

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
