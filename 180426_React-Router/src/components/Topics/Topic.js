import React from 'react';
class Topic extends React.Component {
  render() {
    const {match} = this.props;
    return (
      <div>
        <h3>{match.params.topicId}</h3>
      </div>
    );
  }
}
export default Topic;
