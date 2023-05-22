import React from "react";
import classes from './SignUp.module.css';
import { Link } from "react-router-dom";
const ForgotPassword = ()=>{
    return( <div className={classes.klasa}>
    <div className={classes.box}>
    <form>
      <h2>Forgot Password</h2>
      <div className = {classes.inputBox}>
        <input type="text" required="required" ></input>
        <span>Ime</span>
        <i></i>
      </div>
      <div className = {classes.inputBox}>
        <input type="text" required="required" ></input>
        <span>Prezime</span>
        <i></i>
      </div>
      <div className = {classes.inputBox}>
        <input type="text" required="required"></input>
        <span>Email</span>
        <i></i>
      </div>
      <div className = {classes.inputBox}>
        <input type="text" required="required" ></input>
        <span>Adresa</span>
        <i></i>
      </div>
      <div className = {classes.inputBox}>
        <input type="number" required="required" ></input>
        <span>Telefon</span>
        <i></i>
      </div>
      <div className = {classes.inputBox}>
        <input type="text" required="required" ></input>
        <span>Username</span>
        <i></i>
      </div>
      <div className = {classes.inputBox}>
        <input type="password" required="required" ></input>
        <span>Password</span>
        <i></i>
      </div>
      <div className = {classes.inputBox}>
        <input type="password" required="required"></input>
        <span>Confirm password</span>
        <i></i>
      </div>
      <div className = {classes.links}>
        <a href="#" >Forgot Password </a>
        <Link to="/login" >Login</Link>
      </div>
      <input type = "submit" value="Sign Up" ></input>
    </form>
    </div>
    </div>
    )

}
export default ForgotPassword;