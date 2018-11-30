import * as React from 'react';

import * as _ from 'lodash';
import * as axios from 'axios';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// import {List, ListItem, ListItemText} from '@material-ui/core';

// import Test1 from '../test1/test1';

class App extends React.Component {
  public constructor(arg: any) {
    super(arg);
  }
  public componentWillMount(): void {
    console.log(_.join(['Another', 'module', 'loaded!'], ' '));
    console.log(axios);
  }
  public render(): JSX.Element {
    return (
      <div className="app">
        <List component="nav">
          <ListItem button>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
        {/* <Test1 /> */}
      </div>
    );
  }
}

export default App;
