import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,Route,createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Veljko/LoginPage/Login';
import SignUp from './Veljko/LoginPage/SignUp';
import ErrorModal from './Veljko/LoginPage/ErrorModal';
import Test from './Veljko/LoginPage/Test';
import { AuthContextProvider } from './Veljko/store/auth-context';
import Naslovna from "./Uros/Stranice/Naslovna/Naslovna"
import App from './Veljko/ProfilePage/Profile';
import Profile from './Veljko/ProfilePage/Profile';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Layout from './Veljko/ProfilePage/Layout';
import {naslovnaLoader} from './Uros/Stranice/Naslovna/Naslovna'
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Naslovna />,
      loader:naslovnaLoader
    },
    {
      path: "login",
      element: <Login/>
    },
    {
      path: "signup",
      element: <SignUp />
    },
    {
      path: 'test',
      element:<Layout/>
    }
  ]

   )
root.render(
  <AuthContextProvider>
    <ProSidebarProvider>
      <RouterProvider router={router}>

      </RouterProvider>
{/*   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Naslovna/>}/>
    <Route path="login" element={<Login></Login>}/>
    <Route path="signup" element = {<SignUp></SignUp>}/>
    <Route path="test" element = {<Layout></Layout>}/>
   </Routes>
  </BrowserRouter> */}
  </ProSidebarProvider>
  </AuthContextProvider>
);


