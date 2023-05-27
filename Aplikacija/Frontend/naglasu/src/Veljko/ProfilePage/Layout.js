import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";
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
const Layout =() =>{
  const dispatch=useDispatch();
  const user = useSelector(state =>({
    name:state.user.uname,
    surname:state.user.usurname,
    username:state.user.uusername,
    address:state.user.uaddress,
    email:state.user.uemail,
    phone:state.user.uphone,
    uplata:state.user.uuplata,
    role:state.user.urole
    //<span className="text-black-50">veljkoveljovic13@gmail.com</span>
  }));
  //console.log(user.name+" "+user.surname);
  const savedUserState=localStorage.getItem('userState');
  if(savedUserState)
  {
    dispatch(userActions.setValues(JSON.parse(savedUserState)));
  }
  dispatch(userActions.getValues());
  console.log(user.name+" "+user.surname+""+user.role);
  const[promenaUgovora,setPromenaUgovora]=useState(true);
  const [promenaTabela,setPromenaTabela]= useState(true);
  const handlerTabela = () =>{
    if(promenaTabela===true)
    setPromenaTabela(false);
    else
    setPromenaTabela(true);
    console.log("aaaaaaa");
  }
  const handlerUgovora =() =>{
    if(promenaUgovora===true)
    setPromenaUgovora(false);
    else
    setPromenaUgovora(true);
    console.log("aaaaaaa");
  }
  console.log("profilnasidebar");
  const [isPromena,SetPromena]=useState(true);
  const handler = ()=>{
    console.log("okinava");
    if(isPromena===true)
    {
   SetPromena(false);
    }
    else
    SetPromena(true);
  }
  let navigacija = useNavigate();
  const routeChange = () =>{
    let path = `/`;
    navigacija(path);
    console.log("hahahah");
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
          <MenuItem icon={<HomeOutlinedIcon></HomeOutlinedIcon>}onClick={routeChange}>Pocetna stranica</MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />}>Moji podaci</MenuItem>
          <MenuItem icon={<ContactsOutlinedIcon />}>Moji oglasi</MenuItem>
          <MenuItem icon={<ReceiptOutlinedIcon />}>Praceni oglasi</MenuItem>
          <MenuItem icon={<HelpOutlineOutlinedIcon />}onClick={handlerUgovora}>Ugovori</MenuItem>
          <MenuItem icon={<CalendarTodayOutlinedIcon />}>O nama</MenuItem>
          <MenuItem icon = {<SettingsIcon></SettingsIcon>}onClick ={handler}>Settings</MenuItem>
          {user.role=="PremiumUser"?(<MenuItem icon ={<AdminPanelSettingsIcon></AdminPanelSettingsIcon>}onClick={handlerTabela}>AdminSettings</MenuItem>):<></>}
        </Menu>
      </Sidebar>
      <main style={{ width: '100%', height: '100%' }}>
        {isPromena?(<h1 style={{ color: "white", marginLeft: "5rem" }}>
          
        </h1>):<EditPage></EditPage>}
      </main>
      <main style={{ width: '100%', height: '100%' }}>
        {promenaUgovora?(<h1 style={{ color: "white", marginLeft: "5rem" }}>
          
        </h1>):<Oglasi></Oglasi>}
      </main>
      <main style={{ width: '100%', height: '100%' }}>
        {promenaTabela?(<h1 style={{ color: "white", marginLeft: "5rem" }}>
          
        </h1>):<DataTable style = {{float:"left", width:"100%" }}></DataTable>}
      </main>
      </div>
    );
}
export default Layout;