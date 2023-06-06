import React, { useContext, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import classes from "../LoginPage/Login.module.css";
import ErrorModal from "./ErrorModal";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { getListSubheaderUtilityClass } from "@mui/material";
import { userActions } from "../store/user";
import PopUpModal from './PopUpModal';
import NavBarContext from "../../Uros/Contexts/NavBarContext";
const Login = (props) => {
  // const { navbarSetCollapsable } = React.useContext(NavBarContext)
  //   React.useEffect(() => {
        
  //       navbarSetCollapsable(true)
  //       return ()=>navbarSetCollapsable(false)
  //   }, [])
  const dispatch=useDispatch();
  const user = useSelector(state =>({
    name:state.user.uname,
    surname:state.user.usurname,
    username:state.user.uusername,
    address:state.user.uaddress,
    email:state.user.uemail,
    phone:state.user.uphone,
    uplata:state.user.uuplata,
    role:state.user.urole,
    slika:state.user.uslika
  }));
  const authCtx = useContext(AuthContext);
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
  const[errorPop,setErrorPop]=useState();
  useEffect(()=>{
    if(authCtx.token)
    {
    console.log(authCtx.token);
    fetch("http://localhost:5105/Authentication/GetUser",{
      headers:{
        "Authorization":`Bearer ${authCtx.token}`
      }
    })
    .then(odgovor => odgovor.json())
      .then(odgovorTekst =>  {
            const obj = {
              name:odgovorTekst.ime,
              surname:odgovorTekst.prezime,
              address:odgovorTekst.adresa,
              email:odgovorTekst.email,
              phone:odgovorTekst.telefon,
              username:odgovorTekst.userName,
              uplata:odgovorTekst.uplata,
              role:odgovorTekst.rola,
              slika:odgovorTekst.slika
            };
            console.log(odgovorTekst);
            dispatch(userActions.setValues(obj));
            dispatch(userActions.getValues());
            console.log(odgovorTekst.slika);
            localStorage.setItem('userState', JSON.stringify(obj));
            navigate('/test');

       } )
            .catch((error) => {
              console.log(error);
            });
        }
  },[authCtx.token])
  const handler = (event) => {
    event.preventDefault();
    let test=-1;
    const pass = passwordInputRef.current.value;
    const username = usernameInputRef.current.value;
         if(username.trim().length===0)
        {
          setErrorPop({
            title:"Please enter valid username"
          });
          setIsValidForm(false);
          return;
        }
        else if(pass.trim().length===0)
        {
          setIsValidForm(true);
          setErrorPop({
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
           
            setErrorPop({
          title:"Greska",
          message:odgovorTekst
         // message:odgovorTekst
         });
         setIsValidForm(false);
         setIsValidForm2(true);
          }
          else if(odgovorTekst.includes('password'))
          {
            setErrorPop({
              title:"Greska",
          message:odgovorTekst
              
             // message:odgovorTekst
             });
             setIsValidForm(true);
             setIsValidForm2(false);
          }
          else if(odgovorTekst.includes('confirm') || odgovorTekst.includes('suspendovan'))
          {
            setErrorPop({
              title:"Greska",
              message:odgovorTekst
              
             // message:odgovorTekst
             });
             setEmail(true);
            
             
            }
          
          else
          {
           
            const startIndex = odgovorTekst.indexOf(':') + 2;
             const endIndex = odgovorTekst.indexOf('"', startIndex);
             const tokenValue = odgovorTekst.substring(startIndex, endIndex);
             console.log(odgovorTekst);
            authCtx.login(tokenValue);
            localStorage.setItem('token',tokenValue);
           // navigate('/test');
          }
          
          //setEmail(false);
        })
        .catch((error) => {
          console.log(error);
        });
  };
  const errorHandler = () =>{
    setErrorPop(null);
  }
  return (
  
      <div className = {classes.klasa}>
        {errorPop?<PopUpModal title= {errorPop.title} message={errorPop.message} onConfirm={errorHandler}></PopUpModal>:null}
         <div className={classes.box}>
    <form>
      <h2>Login</h2>
      <div className = {classes.inputBox}>
        <input type="text" required="required" ref={usernameInputRef}></input>
        <span  >Username</span>
        <i></i>
      </div>
      <div className = {classes.links}>
      </div>
      <div className = {classes.inputBox}>
        <input type="password" required="required" ref={passwordInputRef}></input>
        <span>Password</span>
        <i></i>
      </div>
      <div className = {classes.links}>
        <a href="/email" >Forgot Password </a>
        <Link to="/signup" >SignUp</Link>
      </div>
      <input type = "submit" value="Login" onClick={handler}></input>
    </form>
    </div>

    </div> 
  
  );
};
export default Login;