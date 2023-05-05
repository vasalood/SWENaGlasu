import React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import classes from "../LoginPage/Login.module.css";
import ErrorModal from "./ErrorModal";
const Login = (props) => {
    const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const [isvalidPassowrd, setPassword] = useState(true);
  const [isValidEmail, setEmail] = useState(true);
  const [error,setError]=useState();
  var text ="a";
  const handler = (event) => {
    event.preventDefault();
    
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
      .then(odgovor => odgovor.text())
      .then(odgovorTekst => 
        {console.log(odgovorTekst) 
          if(usernameInputRef.current.value=="")
            odgovorTekst="Nepostojeci username";
         setError({
          title:odgovorTekst,
         // message:odgovorTekst
         });
          setEmail(false);
        })
        .catch((error) => {
          console.log(error);
        });
     
  };
  return (
  
    <body>
      {!isValidEmail?<ErrorModal title={error.title} message = {error.message}></ErrorModal>: <div className={classes.box}>
    <form>
      <h2>SignUp</h2>
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
      <div className = {classes.links}>
        <a href="#" >Forgot Password </a>
        <Link to="/signup" >SignUp</Link>
      </div>
      <input type = "submit" value="Login" onClick={handler}></input>
    </form>
    </div>}
  
    </body>
  
  );
};
export default Login;
