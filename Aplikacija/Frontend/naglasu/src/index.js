import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,Route, createBrowserRouter, RouterProvider,createRoutesFromElements } from 'react-router-dom';
import Login from './Veljko/LoginPage/Login';
import SignUp from './Veljko/LoginPage/SignUp';
import ErrorModal from './Veljko/LoginPage/ErrorModal';
import Test from './Veljko/LoginPage/Test';
import { AuthContextProvider } from './Veljko/store/auth-context';
import Naslovna from "./Uros/Stranice/Naslovna/Naslovna"
import { naslovnaLoader } from './Uros/Stranice/Naslovna/Naslovna';

function fakeLoader()
{
  console.log("AAAAAA")
  return [
    {
      id: 7,
      ime: "oglas test",
      podkategorija: {
        ime: "string",
        id: 1,
        kategorijaId: 1,
        kategorijaNaziv: "string"
      },
      polja: {
        string: "string"
      },
      kredit: 1231231,
      datumPostavljanja: "2023-05-14T22:42:03.2330115",
      smer: 0,
      tip: 0,
      cena: 12321312,
      kolicina: 12,
      brojPregleda: 0,
      vlasnikUsername: "VELJKO",
      vlasnikId: "bcda",
      lokacija: "Novi Sad",
      stanje: 1,
      slikeZaSlanje: [
        {
          naziv: "5fVVaFByxe5pUU09s9wQ.png",
          redosled: 0
        },
        {
          naziv: "ohPk1wonmR8oJjw41bGE.jpg",
          redosled: 1
          }
      ]
    },
    {
      id: 7,
      ime: "oglas test",
      podkategorija: {
        ime: "string",
        id: 1,
        kategorijaId: 1,
        kategorijaNaziv: "string"
      },
      polja: {
        string: "string"
      },
      kredit: 1231231,
      datumPostavljanja: "2023-05-14T22:42:03.2330115",
      smer: 0,
      tip: 0,
      cena: 12321312,
      kolicina: 12,
      brojPregleda: 0,
      vlasnikUsername: "VELJKO",
      vlasnikId: "bcda",
      lokacija: "Novi Sad",
      stanje: 1,
      slikeZaSlanje: [
        {
          naziv: "5fVVaFByxe5pUU09s9wQ.png",
          redosled: 0
        },
        {
          naziv: "ohPk1wonmR8oJjw41bGE.jpg",
          redosled: 1
          }
      ]
  }
    ]
}
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Naslovna/>} loader={naslovnaLoader} >
          <Route path="login" element={<Login></Login>}/>
          <Route path="signup" element = {<SignUp></SignUp>}/>
    </Route>
  )
   )
root.render(
  <AuthContextProvider>
    <RouterProvider router={router}>

    </RouterProvider>
{/*   <BrowserRouter>
      <Routes>
  
    <Route path="/" element={<Naslovna/>} loader={naslovnaLoader} />
    <Route path="login" element={<Login></Login>}/>
    <Route path="signup" element = {<SignUp></SignUp>}/>
    <Route path="test" element = {<Test></Test>}/>
   </Routes>
  </BrowserRouter> */}
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
