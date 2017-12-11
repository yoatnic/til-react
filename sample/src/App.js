import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const appStyles = {
  textAlign: 'center'
};
const logoStyles = {
  animation: 'App-logo-spin infinite 20s linear',
  height: '80px'
};
const headerStyles = {
  backgroundColor: '#222',
  height: '150px',
  padding: '20px',
  color: 'white'
};
const titleStyles = {
  fontSize: '1.5em'
};
const introStyles = {
  fontSize: 'large'
};

class App extends Component {
  render() {
    return (
      <div style={appStyles}>
        <header style={headerStyles}>
          <img src={logo} alt="logo" style={logoStyles} />
          <h1 style={titleStyles}>Welcome to React</h1>
        </header>
        <p style={introStyles}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
