import { ProSidebarProvider, Sidebar } from "react-pro-sidebar";
import Layout from "./Layout";
import { useState } from "react";
import EditPage from "./EditPage";
import classes from './Profile.module.css';
const Profile = ()=>{
    <ProSidebarProvider>
        <Layout className={classes.klasa}></Layout>
    </ProSidebarProvider>
}
export default Profile;