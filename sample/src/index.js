import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Clock from './Clock';
import registerServiceWorker from './registerServiceWorker';
import AutoFocusTextInput from './AutoFocusTextInput';

// ReactDOM.render(
//   <Clock initialCount={1}/>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <AutoFocusTextInput />,
  document.getElementById('root')
);


// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
