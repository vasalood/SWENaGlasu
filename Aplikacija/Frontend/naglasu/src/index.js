import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './Veljko/LoginPage/Login';
import SignUp from './Veljko/LoginPage/SignUp';
import ErrorModal from './Veljko/LoginPage/ErrorModal';
import Test from './Veljko/LoginPage/Test';
import { AuthContextProvider } from './Veljko/store/auth-context';
import Naslovna from "./Uros/Stranice/Naslovna/Naslovna"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
  <BrowserRouter>
   <Routes>
    <Route path="/" element={<Naslovna/>}/>
    <Route path="login" element={<Login></Login>}/>
    <Route path="signup" element = {<SignUp></SignUp>}/>
    <Route path="test" element = {<Test></Test>}/>
   </Routes>
  </BrowserRouter>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
