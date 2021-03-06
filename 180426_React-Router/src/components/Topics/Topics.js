import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import Topic from '../Topics/Topic';

class Topics extends React.Component {
  render() {
    const { match, location } = this.props;
    const login = location.state.login;
    if (!login) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${match.url}/rendering`}>Rendering with React</Link>
          </li>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
          </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route
          exact
          path={match.url}
          render={() => <h3>Please select a topic.</h3>}
        />
      </div>
    );
  }
}
export default Topics;
