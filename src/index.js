import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/';
import * as serviceWorker from './serviceWorker';
// import registerServiceWorker from './registerServiceWorker'


ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
serviceWorker.unregister();

