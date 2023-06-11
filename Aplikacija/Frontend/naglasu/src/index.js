import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes,Route,createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Veljko/LoginPage/Login';
import Test from './Veljko/LoginPage/Test';
import { AuthContextProvider } from './Veljko/store/auth-context';
import Naslovna from "./Uros/Stranice/Naslovna/Naslovna"
import SignUp from './Veljko/LoginPage/SignUp';
//import App from './Veljko/ProfilePage/Profile';
import App from './App'
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
import Navbar from './Uros/Komponente/Navbar/Navbar'
import QuoteItem from './Veljko/ProfilePage/QuoteItem';
import { Collapse } from '@mui/material';
import ForgotPasswordPage from './Veljko/LoginPage/ForgotPasswordPage';
import Chat, { chatLoader } from './Uros/Stranice/Chat/Chat';
import Oglas from './Vasa/Komponente/Oglas';

import Kategorija from './Vasa/Komponente/Kategorija';

import PostaviOglas from './Vasa/Komponente/PostaviOglas';

import { OglasLoader } from './Vasa/Komponente/Oglas';
import './res/colors.css'
import App3 from './Veljko/Kartica/App';
import ViewUser from './Veljko/ProfilePage/ViewUser';
import RecipeReviewCard from './Veljko/ProfilePage/KarticaNekaMui';
import KarticaOglasNova from './Veljko/ProfilePage/KarticaOglasNova';
const root = ReactDOM.createRoot(document.getElementById('root'));


const router = createBrowserRouter(
  [
    {
      path: "/:N?/:M?/:orderBy?/:orderType?/:filters?",
      element: <Naslovna />,
      loader:naslovnaLoader
    },
    {
      path: '/chat/:chatId/:oglasId?/:strankaId?',
      element: <Chat />,
      loader:chatLoader
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
      element:<ForgotPasswordPage></ForgotPasswordPage>
    },
    {
      path:'email',
      element:<EmailSentForgot></EmailSentForgot>
    },
    {
      path:'neka',
      element:<App3></App3>
    },
    {
      path: '/profil/:username',
      element:<ViewUser/>
    },
    {

      path:'oglas/:oglasId',

      element:<Oglas></Oglas>,

      loader: OglasLoader

    },

    {

      path:'postavioglas',

      element:<PostaviOglas></PostaviOglas>

    }
  ]

   )
root.render(

  <Provider store = {store}>
  <AuthContextProvider>
      <ProSidebarProvider>
        <App>
        <Navbar>
          <RouterProvider router={router}>

          </RouterProvider>
          </Navbar>
      </App>
        
    
  </ProSidebarProvider>
  </AuthContextProvider>
  </Provider>

);


