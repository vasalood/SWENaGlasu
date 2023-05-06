import React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import classes from "../LoginPage/Login.module.css";
import ErrorModal from "./ErrorModal";
import { useNavigate } from "react-router-dom";
import App from "../../App";
const Login = (props) => {
const navigate =useNavigate();
    const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const [isvalidPassowrd, setPassword] = useState(true);
  const [isValidEmail, setEmail] = useState(false);
  const [isValidForm,setIsValidForm]=useState(true);
  const [isValidForm2,setIsValidForm2]=useState(true);
  const [isValidFormOba,setIsValidFormOba]=useState(true);
  const [error,setError]=useState(); // za username recimo
  const[errorPass,setErrorPass]=useState();
  const[promenaStrane,setPromenaStrane]=useState();
  const [isLogin, setLogin] = useState(false);
  var text ="a";
  const handler = (event) => {
    event.preventDefault();
    const pass = passwordInputRef.current.value;
    const username = usernameInputRef.current.value;
         if(username.trim().length===0)
        {
          setError({
            title:"Please enter valid username"
          });
          setIsValidForm(false);
          return;
        }
        else if(pass.trim().length===0)
        {
          setIsValidForm(true);
          setError({
            title:"Please enter valid password"
          });
          setIsValidForm2(false);
          return;
        }
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
        {
          if(odgovorTekst.includes('username'))
          {
         setError({
          title:odgovorTekst,
          
         // message:odgovorTekst
         });
         setIsValidForm(false);
         setIsValidForm2(true);
          }
          else if(odgovorTekst.includes('password'))
          {
            setError({
              title:odgovorTekst,
              
             // message:odgovorTekst
             });
             setIsValidForm(true);
             setIsValidForm2(false);
          }
          else if(odgovorTekst.includes('confirm') || odgovorTekst.includes('suspendovan'))
          {
            setPromenaStrane({
              title:odgovorTekst,
              
             // message:odgovorTekst
             });
             setEmail(true);
            
          }
          else
          {
            navigate('/');
          }
          
          //setEmail(false);
        })
        .catch((error) => {
          console.log(error);
        });
     //style={{color:!isValidForm?'red':'#8f8f8f'}}
  };
  return (
  
    
      <div>
      {isValidEmail?<ErrorModal title={promenaStrane.title} ></ErrorModal>: <div className={classes.box}>
    <form>
      <h2>Login</h2>
      <div className = {classes.inputBox}>
        <input type="text" required="required" ref={usernameInputRef}></input>
        <span  >Username</span>
        <i></i>
      </div>
      {!isValidFormOba?
      <div>
        <span style={{color:'red'}}>{error.title}</span>
      </div>:null
        }
      {!isValidForm?
      <div>
        <span style={{color:'red'}}>{error.title}</span>
      </div>:null
        }
      <div className = {classes.links}>
      </div>
      <div className = {classes.inputBox}>
        <input type="password" required="required" ref={passwordInputRef}></input>
        <span>Password</span>
        <i></i>
      </div>
      {!isValidFormOba?
      <div>
        <span style={{color:'red'}}>{error.title2}</span>
      </div>:null
        }
      {!isValidForm2?
      <div>
        <span style={{color:'red'}}>{error.title}</span>
      </div>:null
        }
      <div className = {classes.links}>
        <a href="#" >Forgot Password </a>
        <Link to="/signup" >SignUp</Link>
      </div>
      <input type = "submit" value="Login" onClick={handler}></input>
    </form>
    </div>}
    </div>
   
  
  );
};
export default Login;
