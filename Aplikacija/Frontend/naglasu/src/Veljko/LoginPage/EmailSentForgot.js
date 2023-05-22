import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import classes from './Email.module.css';
const EmailSentForgot = () =>{
    const emailRef=useRef();
    const handler = (event) =>{
        event.preventDefault(); 

        console.log(emailRef.current.value);
        fetch("http://localhost:5105/Authentication/ForgotPassword/"+emailRef.current.value, {
        method: "POST", // HTTP metoda koja se koristi za zahtev
        headers: {
          "Content-Type": "application/json", // Tip sadržaja koji se šalje
        },
        body: JSON.stringify({
          // Objekat koji se šalje kao sadržaj
         
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
    return(<div className={classes.klasa}>
        <div className={classes.box}>
        <form>
          <h2>Forgot Password</h2>
          <div className = {classes.inputBox}>
            <input type="text" required="required" ref ={emailRef}></input>
            <span>Email</span>
            <i></i>
          </div>
          <div className = {classes.links}>
            <Link to="/login" >Back to login</Link>
          </div>
          <input type = "submit" value="Send" onClick={handler}></input>
        </form>
        </div>
        </div>)
}
export default EmailSentForgot;