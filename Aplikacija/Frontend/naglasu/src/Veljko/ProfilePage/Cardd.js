import React from 'react';

import './Cardd.css';

const Cardd = (props) => {
  const classes = 'card ' + props.className;

  return <div className={classes}>{props.children}</div>;
};

export default Cardd;