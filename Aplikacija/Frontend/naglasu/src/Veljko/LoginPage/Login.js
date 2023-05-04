import React from "react";
import { useState, useRef } from "react";
import classes from "../LoginPage/Login.module.css";
const Login = (props) => {
    const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const emailInputRef = useRef();
  const telefonInputRef = useRef();
  const adresaInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const switchPageHandler = () => {
   console.log (classes.box)
      
    setIsLogin((prevState) => !prevState);
  };
  const handler = (event) => {
    event.preventDefault();
    if (isLogin) {
      fetch("http://localhost:5105/Authentication/Login", {
        method: "POST", // HTTP metoda koja se koristi za zahtev
        headers: {
          "Content-Type": "application/json", // Tip sadržaja koji se šalje
        },
        body: JSON.stringify({
          // Objekat koji se šalje kao sadržaj
          userName: usernameInputRef.current.value,
          password: passwordInputRef.current.value,
        }),
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
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
            .then((response) => {
              console.log(response.json().catch());
            })
            .catch((error) => {
              console.log(error);
            });
          }
  };
  return (
    <body>
    <div className={classes.box}>
    <form>
      <h2>Login</h2>
      <div className = {classes.inputBox}>
        <input type="text" required="required"></input>
        <span>Username</span>
        <i></i>
      </div>
      <div className = {classes.inputBox}>
        <input type="password" required="required"></input>
        <span>Password</span>
        <i></i>
      </div>
      <div className = {classes.links}>
        <a href="#" >Forgot Password </a>
        <a href="#" onClick={switchPageHandler}>SignUp</a>
      </div>
      <input type = "submit" value="Login"></input>
    </form>
    </div>
    </body>
  );
};
export default Login;
