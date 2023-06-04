import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import classes from './Email.module.css';
const ForgotPassword = (props) =>{
    const emailRef=useRef();
    const email = localStorage.getItem("email");
    const passwordInputRef = useRef();
    const confirmPasswordInputRef=useRef();
    const tokenInputRef=useRef();

    const handler = (event) =>{
        event.preventDefault(); 

        
        fetch("http://localhost:5105/Authentication/Reset Password", {
        method: "POST", // HTTP metoda koja se koristi za zahtev
        headers: {
          "Content-Type": "application/json", // Tip sadržaja koji se šalje
        },
        body: JSON.stringify({
          email:email,
        password:passwordInputRef.current.value,
        confrimPassword:confirmPasswordInputRef.current.value,
        token:tokenInputRef.current.value
        }),
      })
      .then(odgovor => odgovor.text())
      .then(odgovorTekst => 
        {
            console.log(odgovorTekst);
        }) .catch((error) => {
            console.log(error);
          });
    };
   
    return( <div className={classes.klasa} >
        <div className={classes.box} style={{width:"390px", height:"515px"} }>
        <form>
          <h2>Forgot Password</h2>
          <div className = {classes.inputBox}>
            <input type="text" required="required" ref={tokenInputRef}></input>
            <span>Verifikacioni token</span>
            <i></i>
          </div>
          <div className = {classes.inputBox}>
            <input type="password" required="required" ref={passwordInputRef}></input>
            <span>Password</span>
            <i></i>
          </div>
          <div className = {classes.inputBox}>
            <input type="password" required="required" ref={confirmPasswordInputRef}></input>
            <span>Confirm password </span>
            <i></i>
          </div>
          <div className = {classes.links}>
            <a href="#" >Forgot Password </a>
            <Link to="/login" >Login</Link>
          </div>
          <input type = "submit" value="Sign Up" onClick={handler} ></input>
        </form>
        </div>
        </div>
        )
}
export default ForgotPassword;