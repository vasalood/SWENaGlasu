import React, { useState } from "react";
import { useRef } from "react";
import classes from './SignUp.module.css';
import ErrorModal from "./ErrorModal";
import { Link } from "react-router-dom";
const SignUp = props =>{
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const nameInputRef = useRef();
    const surnameInputRef = useRef();
    const emailInputRef = useRef();
    const telefonInputRef = useRef();
    const adresaInputRef = useRef();
    const confInputRef = useRef();
    const [currValue,setCurrValue]=useState(false);
    const switchPageHandler = (event) => {
        event.preventDefault();
        if(confInputRef.current.value!= passwordInputRef.current.value)
                setCurrValue(true);
        fetch("http://localhost:5105/Authentication/SignUp",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body:JSON.stringify({
                ime:nameInputRef.current.value,
                prezime:surnameInputRef.current.value,
                userName:usernameInputRef.current.value,
                password:passwordInputRef.current.value,
                email:emailInputRef.current.value,
                adresa:adresaInputRef.current.value,
                telefon:telefonInputRef.current.value
            }),
          })
          .then(odgovor => odgovor.text())
          .then(odgovorTekst => console.log(odgovorTekst))
            .catch((error) => {
              //console.log(error);
            });
          };
    return (
        <body>
            {currValue==true ? (
            <ErrorModal></ErrorModal>) : null}
        <div className={classes.box}>
        <form>
          <h2>Sign Up</h2>
          <div className = {classes.inputBox}>
            <input type="text" required="required" ref={nameInputRef}></input>
            <span>Ime</span>
            <i></i>
          </div>
          <div className = {classes.inputBox}>
            <input type="text" required="required" ref={surnameInputRef}></input>
            <span>Prezime</span>
            <i></i>
          </div>
          <div className = {classes.inputBox}>
            <input type="text" required="required" ref={emailInputRef}></input>
            <span>Email</span>
            <i></i>
          </div>
          <div className = {classes.inputBox}>
            <input type="text" required="required" ref={adresaInputRef}></input>
            <span>Adresa</span>
            <i></i>
          </div>
          <div className = {classes.inputBox}>
            <input type="number" required="required" ref={telefonInputRef}></input>
            <span>Telefon</span>
            <i></i>
          </div>
          <div className = {classes.inputBox}>
            <input type="text" required="required" ref={usernameInputRef}></input>
            <span>Username</span>
            <i></i>
          </div>
          <div className = {classes.inputBox}>
            <input type="password" required="required" ref={passwordInputRef}></input>
            <span>Password</span>
            <i></i>
          </div>
          <div className = {classes.inputBox}>
            <input type="password" required="required" ref={confInputRef}></input>
            <span>Confirm password</span>
            <i></i>
          </div>
          <div className = {classes.links}>
            <a href="#" >Forgot Password </a>
            <Link to="/login" >Login</Link>
          </div>
          <input type = "submit" value="Sign Up" onClick={switchPageHandler}></input>
        </form>
        </div>
        </body>
      );  
};
export default SignUp;