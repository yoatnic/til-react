import React from 'react';

const introStyles = {
  fontSize: 'large'
};

const Greet = function(props) {
  return <p style={introStyles}>{props.message}</p>;
}

export default Greet;
