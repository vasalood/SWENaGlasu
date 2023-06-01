import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes,Route,createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Veljko/LoginPage/Login';
import Test from './Veljko/LoginPage/Test';
import { AuthContextProvider } from './Veljko/store/auth-context';
import Naslovna from "./Uros/Stranice/Naslovna/Naslovna"
import SignUp from './Veljko/LoginPage/SignUp';
import App from './Veljko/ProfilePage/Profile';
import Profile from './Veljko/ProfilePage/Profile';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Layout from './Veljko/ProfilePage/Layout';
import {naslovnaLoader} from './Uros/Stranice/Naslovna/Naslovna'
import ForgotPassword from './Veljko/LoginPage/ForgotPassword';
import EmailSentForgot from './Veljko/LoginPage/EmailSentForgot';
import { Provider } from 'react-redux';
import store from './Veljko/store';
import  MenuItem  from './Veljko/ProfilePage/MenuItemm';
import DataTable from './Veljko/ProfilePage/Datatable';
import Neka from './Veljko/ProfilePage/Neka';
import  Payment  from './Veljko/ProfilePage/Payment';
import QuickFilteringGrid from './Veljko/ProfilePage/NovaTabela';
const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter(
  [
    {
      path: "/:N?/:M?/:orderBy?/:orderType?/:filters?",
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
    },
    {
      path:'forgot',
      element:<ForgotPassword></ForgotPassword>
    },
    {
      path:'email',
      element:<Payment></Payment>
    },
    {
      path:'neka',
      element:<QuickFilteringGrid></QuickFilteringGrid>
    }
    
  ]

   )
root.render(
  <Provider store = {store}>
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
  </Provider>
);


