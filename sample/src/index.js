import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Clock from './Clock';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
