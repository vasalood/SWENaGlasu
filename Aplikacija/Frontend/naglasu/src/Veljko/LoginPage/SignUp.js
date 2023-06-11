import React, { useState } from "react";
import { useRef } from "react";
import classes from './SignUp.module.css';
import ErrorModal from "./ErrorModal";
import { Link } from "react-router-dom";
import PopUpModal from './PopUpModal';
import { useNavigate } from "react-router-dom";
const SignUp = props =>{
  let token = localStorage.getItem('token');
  const navigate =useNavigate();
    const usernameInputRef = useRef();
    const confInputSlika = useRef();
    const passwordInputRef = useRef();
    const nameInputRef = useRef();
    const surnameInputRef = useRef();
    const emailInputRef = useRef();
    const telefonInputRef = useRef();
    const adresaInputRef = useRef();
    const confInputRef = useRef();
    const [currValue,setCurrValue]=useState(false);
    const [errorPop,setErrorPop]=useState();
    let letka = -1;
    const handlerSlike = () =>{

      const formDataSlika=new FormData();
      formDataSlika.append('slika', confInputSlika.current.files[0]);
      formDataSlika.append('userName', usernameInputRef.current.value);
      fetch("http://localhost:5105/Authentication/UploadImage",{
        method:"POST",
            body:formDataSlika
          })
          .then(odgovor => odgovor.text())
          .then(odgovorTekst => {console.log(odgovorTekst); navigate('/login');})
            .catch((error) => {
              console.log(error);
            });
            
          };    
    
    const switchPageHandler = (event) => {
         event.preventDefault();
         const username = usernameInputRef.current.value;
         const ime = nameInputRef.current.value;
         const prezime = surnameInputRef.current.value;
        const email = emailInputRef.current.value;
        const adresa = adresaInputRef.current.value;
        const password = passwordInputRef.current.value;
        const confpassword=confInputRef.current.value;
        let f = -1;
         if(username.trim().length===0)
        {
          setErrorPop({
            title:"Unesite validan username"
          });
          f=1;
        }
        if(ime.trim().length<2)
        {
          setErrorPop({
            title:"Vaše ime mora sadržati barem 2 karaktera"
          });
          f=1;
        }
        if(prezime.trim().length<2)
        {
          setErrorPop({
            title:"Vaše prezime mora sadržati barem 2 karaktera"
          });
          f=1;
        }
        if(adresa.trim().length<2)
        {
          setErrorPop({
            title:"Vaša adresa mora da sadrži barem 2 karaktera"
          });
          f=1;
        }
        if(/\d/.test(ime))
        {
          setErrorPop({
            title:"Vaše ime ne sme da sadrži cifru."
          });
          f=1;
        }
        if(/\d/.test(prezime))
        {
          setErrorPop({
            title:"Vaše prezime ne sme da sadrži cifru."
          });
          f=1;
        }
        if(email.trim().length<5)
        {
          setErrorPop({
            title:"Vaš email mora sadržati barem 5 karaktera."
          });
          f=1;
        }
        if (!email.includes("@") || !email.includes("."))
        {
          setErrorPop({
            title:"Vaš email nije validan"
          });
          f=1;
        }
        // if (/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password))
        // {
        //   setErrorPop({
        //     title:"Nevalidna lozinka"
        //   });
        //   f=1;
        // }
        if(password!=confpassword)
        {
          setErrorPop({
            title:"Lozinke se ne poklapaju"
          });
          f=1;
        }
         const formDataSlika=new FormData();
         const formData = new FormData();
        formData.append('Ime', nameInputRef.current.value);
        formData.append('Prezime', surnameInputRef.current.value);
        formData.append('UserName', usernameInputRef.current.value);
        formData.append('Password', passwordInputRef.current.value);
        formData.append('Email', emailInputRef.current.value);
        formData.append('Adresa', adresaInputRef.current.value);
        formData.append('Telefon', telefonInputRef.current.value);
        formDataSlika.append('slika', confInputSlika.current.files[0]);
        formDataSlika.append('userName', usernameInputRef.current.value);
        console.log(confInputSlika.current.files[0]);
        if(confInputRef.current.value!= passwordInputRef.current.value)
                setCurrValue(true);
                if(f===-1){
        fetch("http://localhost:5105/Authentication/SignUp",{
          method: "POST", // HTTP metoda koja se koristi za zahtev
          headers: {
            "Content-Type": "application/json", // Tip sadržaja koji se šalje
          },
          body: JSON.stringify({
            // Objekat koji se šalje kao sadržaj
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
          if (response.status === 200) {
            return response.text();
          } else if (response.status === 400) {
            letka = 1;
            return response.text();
          } else {
            throw new Error("Neuspešan zahtev");
          }
        })
        .then((odgovorTekst) => {
          console.log(odgovorTekst);
          if(letka == -1 &&confInputSlika.current.files.length > 0)
          handlerSlike();
          else if(letka ==1)
          {
            setErrorPop({
              title:"Greška",
              message:odgovorTekst
            })
          }
          else if(letka ==-1)
          navigate('/login');
        })
        .catch((error) => {
          console.error(error);
        });
                }
    }
    const errorHandler = () =>{
      setErrorPop(null);
    }
        return (
          <>
          {!token ?(
       <div className={classes.klasa}>
            {errorPop?<PopUpModal title= {errorPop.title} message={errorPop.message} onConfirm={errorHandler}></PopUpModal>:null}
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
          <input type="file" required="required" ref={confInputSlika}></input>
            <span>Slika</span>
            <i></i>
            <Link to="/email" >Forgot Password</Link>
            <Link to="/login" >Login</Link>
          </div>
          <input type = "submit" value="Sign Up" onClick={switchPageHandler}></input>
        </form>
        </div>
        </div>):<></>}
        </>
      );  
};
export default SignUp;