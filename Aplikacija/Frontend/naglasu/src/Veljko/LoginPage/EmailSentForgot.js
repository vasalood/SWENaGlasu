import React, { useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import classes from './Email.module.css';
import PopUpModal from './PopUpModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const EmailSentForgot = () =>{
  let token = localStorage.getItem('token');
  const validateEmail = (email) => {
    // Provera da li email adresa sadrži simbol "@" i tačku "."
    const hasAtSymbol = email.includes("@");
    const hasDot = email.includes(".");
    const hasLength = email.length>5;
    // Vraćanje rezultata validacije
    return hasAtSymbol && hasDot && hasLength;
  };
  const navigate =useNavigate();
  const[errorPop,setErrorPop]=useState();
    const emailRef=useRef();
    const handler = (event) =>{
      const email = emailRef.current.value;
      const isEmailValid = validateEmail(email);
        event.preventDefault(); 
        let a="a";
        console.log(emailRef.current.value);
        if(isEmailValid)
        {
        fetch("http://localhost:5105/Authentication/ForgotPassword/" + emailRef.current.value, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Objekat koji se šalje kao sadržaj
          }),
        })
          .then(response => {
            if (response.status === 200) {
              console.log("Status code 200 - OK");
              a="200";
              return response.text(); // Dobija odgovor kao tekst
            } else if (response.status === 400) {
              console.log("Status code 400 - Bad Request");
              a="400";
              return response.text(); // Dobija odgovor kao tekst
            } else {
              console.log("Nepoznat statusni kod: " + response.status);
              throw new Error("Nepoznat statusni kod"); // Bacanje greške u slučaju nepoznatog statusnog koda
            }
          })
          .then(text => {
            if(a == "200")
            setErrorPop({
              title:text,
              message:"na Vaš email  smo poslali token koji je potrebno iskopirati i uneti u formu gde ćete uneti i novu šifru"
            })
            else
            {
              setErrorPop({
                title:text,
                message:""
              })
            }
            
        
            // Dodajte ovde logiku koja se izvršava sa sadržajem odgovora u tekstualnom formatu
          })
          .catch(error => {
            console.error("Došlo je do greške prilikom izvršavanja zahteva:", error);
          });
        }
        else
        {
          setErrorPop({
            title:"Nevalidan email",
            message:""
          })
        }
    };
    const errorHandler = () =>{
      if(errorPop.title.includes("Poštovani"))
      {
      localStorage.setItem("email", emailRef.current.value);
      navigate('/forgot');
      }
      else
        setErrorPop(null);
    }
    return(
    <>
    {!token?(
    <div className={classes.klasa}>
      {errorPop?<PopUpModal title= {errorPop.title} message={errorPop.message} onConfirm={errorHandler}></PopUpModal>:null}
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
        </div>):<></>}
        </>
        )
}
export default EmailSentForgot;