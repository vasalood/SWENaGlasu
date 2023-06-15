import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Veljko/LoginPage/Login';
import { AuthContextProvider } from './Veljko/store/auth-context';
import Naslovna from "./Uros/Stranice/Naslovna/Naslovna"
import SignUp from './Veljko/LoginPage/SignUp';
import App from './App';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Layout, { layoutLoader } from './Veljko/ProfilePage/Layout';
import {naslovnaLoader} from './Uros/Stranice/Naslovna/Naslovna';
import EmailSentForgot from './Veljko/LoginPage/EmailSentForgot';
import { Provider } from 'react-redux';
import store from './Veljko/store';
import Navbar from './Uros/Komponente/Navbar/Navbar'
import ForgotPasswordPage from './Veljko/LoginPage/ForgotPasswordPage';
import Chat, { chatLoader } from './Uros/Stranice/Chat/Chat';
import Oglas from './Vasa/Komponente/Oglas';
import PostaviOglas from './Vasa/Komponente/PostaviOglas';
import { OglasLoader } from './Vasa/Komponente/Oglas';
import { AzurirajOglasLoader } from './Vasa/Komponente/AzurirajOglas';
import './res/colors.css'
import App3 from './Veljko/Kartica/App';
import ViewUser from './Veljko/ProfilePage/ViewUser';
import AzurirajOglas from './Vasa/Komponente/AzurirajOglas';
import ErrorPage from './ErrorPage';

const root = ReactDOM.createRoot(document.getElementById('root'));


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Navbar />,
      errorElement:<ErrorPage/>,
      children: [
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
          path: 'test/:N?/:M?/:orderBy?/:orderType?/:filters?',
          element: <Layout />,
          loader:layoutLoader
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
    
        },
        {
    
          path:'azurirajoglas/:oglasId',
    
          element:<AzurirajOglas></AzurirajOglas>,
          loader:AzurirajOglasLoader
    
        }
      ]
    }
    
  ]

   )
root.render(

  <Provider store = {store}>
  <AuthContextProvider>
      <ProSidebarProvider>
        <App>
        {/* <Navbar> */}
          <RouterProvider router={router}>

          </RouterProvider>
          {/* </Navbar> */}
      </App>
        
    
  </ProSidebarProvider>
  </AuthContextProvider>
  </Provider>

);


