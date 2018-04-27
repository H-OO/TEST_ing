import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from '../src/components/App/App';
import Home from '../src/components/Home/Home';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
