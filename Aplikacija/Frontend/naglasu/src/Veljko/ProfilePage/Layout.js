import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useState } from "react";
import  './Layout.module.css';
import EditPage from "./EditPage";
const Layout =() =>{
  const [isPromena,SetPromena]=useState(true);
  const handler = ()=>{
    console.log("okinava");
    if(isPromena===true)
   SetPromena(false);
    else
    SetPromena(true);
  }
  const { collapseSidebar } = useProSidebar();
    return (
      <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
        <Sidebar style={{ height: "100vh" }}>
        <Menu>
          <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2>Admin</h2>
          </MenuItem>
          <MenuItem icon={<HomeOutlinedIcon></HomeOutlinedIcon>}onClick ={handler}>Pocetna stranica</MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />}>Moji podaci</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Moji oglasi</MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}>Praceni oglasi</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}>Ugovori</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>O nama</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ width: '100%', height: '100%' }}>
        {isPromena?(<h1 style={{ color: "white", marginLeft: "5rem" }}>
          React-Pro-Sidebar
        </h1>):<EditPage></EditPage>}
      </main>
      </div>
    );
}
export default Layout;