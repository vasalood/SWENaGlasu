import React from 'react';
import classes from './ErrorModal.module.css';

const ErrorModal = (props) => {
  return (
    <body>
    <div className={classes.box}>
    <form>
      <h2>{props.title}</h2>
      <div className = {classes.inputBox}>
      </div>
      <s >{props.message}</s>
      <input type = "submit" value="Ok" ></input>
    </form>
    </div>
    </body>);
};

export default ErrorModal;