import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Graphs from './Graphs';

import * as serviceWorker from './serviceWorker';

if (window.location.pathname === '/') {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
    );
} else if (window.location.pathname === '/graphs/') {
  ReactDOM.render(
    <Graphs />,
    document.getElementById('graphs')
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

