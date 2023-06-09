import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SettingsIcon from '@mui/icons-material/Settings';
import { useContext, useState } from "react";
import  './Layout.module.css';
import EditPage from "./EditPage";
import { useNavigate } from "react-router-dom";
import MenuItemm from "./MenuItemm";
import { userActions } from "../store/user";
import { useSelector,useDispatch } from "react-redux";
import Oglasi from "./Oglasi";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Table2 from './Table2';
import DataTable from "./Datatable";
import Layout from "./Layout";
import AuthContext from "../store/auth-context";
import React from "react";
import NavBarContext from "../../Uros/Contexts/NavBarContext";
import SearchBar from "../../Uros/Stranice/Naslovna/Komponente/Searchbar/Searchbar";
import defaultImage from './istockphoto-1300845620-612x612.jpg';
import KarticeZaPrikaz from "./KarticeZaPrikaz";
const Neka = () =>{
  const { navbarSetCollapsable } = React.useContext(NavBarContext)
  React.useEffect(() => {
      
      navbarSetCollapsable(false)
      return ()=>navbarSetCollapsable(false)
  }, [])
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
    //<span className="text-black-50">veljkoveljovic13@gmail.com</span>
  }));
  const { collapseSidebar } = useProSidebar();
    return(
    
    <section style={{ backgroundColor: "#eee" }}>
    <div className="container py-5">
     
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
            <img
  src={user.slika ? `data:image/jpeg;base64, ${user.slika}` : defaultImage}
  alt="avatar"
  className="rounded-circle img-fluid"
  style={{ width: 150 }}
/>
              <h5 className="my-3">{user.username}</h5>
              <p className="text-muted mb-1">NaGlasu</p>
              <p className="text-muted mb-4">{user.address}</p>
              <div className="d-flex justify-content-center mb-2">
                <button type="button" className="btn btn-primary">
                  Update
                </button>
                <button type="button" className="btn btn-outline-primary ms-1">
                  Inbox
                </button>
              </div>
            </div>
          </div>
          {/* <div className="card mb-4 mb-lg-0">
            <div className="card-body p-0">
              <ul className="list-group list-group-flush rounded-3">
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i className="fas fa-globe fa-lg text-warning" />
                  <p className="mb-0">https://mdbootstrap.com</p>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i
                    className="fab fa-github fa-lg"
                    style={{ color: "#333333" }}
                  />
                  <p className="mb-0">mdbootstrap</p>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i
                    className="fab fa-twitter fa-lg"
                    style={{ color: "#55acee" }}
                  />
                  <p className="mb-0">@mdbootstrap</p>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i
                    className="fab fa-instagram fa-lg"
                    style={{ color: "#ac2bac" }}
                  />
                  <p className="mb-0">mdbootstrap</p>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i
                    className="fab fa-facebook-f fa-lg"
                    style={{ color: "#3b5998" }}
                  />
                  <p className="mb-0">mdbootstrap</p>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.name}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Prezime</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.surname}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.email}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Mobile</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.phone}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Address</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{user.address}</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-6">
              <div className="card mb-4 mb-md-0">
                <div className="card-body">
                  <p className="mb-4">
                    <span className="text-primary font-italic me-1">
                      assigment
                    </span>{" "}
                    Project Status
                  </p>
                  <p className="mb-1" style={{ fontSize: ".77rem" }}>
                    Web Design
                  </p>
                  <div className="progress rounded" style={{ height: 5 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={80}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                    Website Markup
                  </p>
                  <div className="progress rounded" style={{ height: 5 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "72%" }}
                      aria-valuenow={72}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                    One Page
                  </p>
                  <div className="progress rounded" style={{ height: 5 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "89%" }}
                      aria-valuenow={89}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                    Mobile Template
                  </p>
                  <div className="progress rounded" style={{ height: 5 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "55%" }}
                      aria-valuenow={55}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                    Backend API
                  </p>
                  <div className="progress rounded mb-2" style={{ height: 5 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "66%" }}
                      aria-valuenow={66}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-4 mb-md-0">
                <div className="card-body">
                  <p className="mb-4">
                    <span className="text-primary font-italic me-1">
                      assigment
                    </span>{" "}
                    Project Status
                  </p>
                  <p className="mb-1" style={{ fontSize: ".77rem" }}>
                    Web Design
                  </p>
                  <div className="progress rounded" style={{ height: 5 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "80%" }}
                      aria-valuenow={80}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                    Website Markup
                  </p>
                  <div className="progress rounded" style={{ height: 5 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "72%" }}
                      aria-valuenow={72}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                    One Page
                  </p>
                  <div className="progress rounded" style={{ height: 5 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "89%" }}
                      aria-valuenow={89}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                    Mobile Template
                  </p>
                  <div className="progress rounded" style={{ height: 5 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "55%" }}
                      aria-valuenow={55}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                    Backend API
                  </p>
                  <div className="progress rounded mb-2" style={{ height: 5 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "66%" }}
                      aria-valuenow={66}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      
      <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, color: '#333333' }}>
        Oglasi koje ste postavili su  <mark style={{ padding: '0.25rem 0.5rem', color: '#ffffff', backgroundColor: '#3B82F6', borderRadius: '0.25rem' }}>NaGlasu</mark> 
      </h1>
      
      <KarticeZaPrikaz></KarticeZaPrikaz>
    </div>
    
</section>
    )}
    export default Neka;