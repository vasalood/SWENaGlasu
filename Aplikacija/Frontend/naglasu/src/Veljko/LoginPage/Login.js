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
    <section className={classes.auth}>
      <form>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <div className={classes.control}>
          {isLogin === false ? (
            <div className={classes.control}>
              <label htmlFor="name">Ime</label>
              <input type="name" id="name" ref={nameInputRef} required />
            </div>
          ) : null}

          {isLogin === false ? (
            <div className={classes.control}>
              <label htmlFor="surname">Prezime</label>
              <input
                type="surname"
                id="surname"
                ref={surnameInputRef}
                required
              />
            </div>
          ) : null}
          {isLogin === false ? (
            <div className={`${classes['control']} ${!isValid && classes.invalid}`}>
             <label htmlFor="email">Email</label>
              <input type="email" id="email" ref={emailInputRef} required />
              {isValid ===false ?(<label htmlFor="poruka">Unesite ispravnu email adresu koja sadrzi @</label>):null}
            </div>
          ) : null}
          {isLogin === false ? (
            <div className={classes.control}>
              <label htmlFor="address">Adresa</label>
              <input
                type="address"
                id="address"
                ref={adresaInputRef}
                required
              />
            </div>
          ) : null}
          {isLogin === false ? (
            <div className={classes.control}>
              <label htmlFor="contect">Telefon</label>
              <input
                type="number"
                id="contact"
                ref={telefonInputRef}
                required
              />
            </div>
          ) : null}
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            ref={usernameInputRef}
            required
          />
        </div>

        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          <button onClick={handler}>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchPageHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Login;
