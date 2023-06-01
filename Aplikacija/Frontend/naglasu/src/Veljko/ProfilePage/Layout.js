import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SettingsIcon from '@mui/icons-material/Settings';
import WavingHandIcon from '@mui/icons-material/WavingHand';
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
import Neka from "./Neka";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import GavelIcon from '@mui/icons-material/Gavel';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import Ugovori from "./Ugovori";
import Expenses from "./Expenses";
const Layout =() =>{
  const [page, setPage] = useState({
    favoriti:"",
    tabele:"",
    ugovori:"",
    oglasi:"",
    korisnik:"",
    ocene:""
  });
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
  console.log(page);
  const handlerUgovora = () =>{
    setPage({
      ugovori:"a",
      favoriti:"",
      tabele:"",
      oglasi:"",
      korisnik:"2",
      ocene:""
    });
  }
  const handlerTabela =() =>{
    console.log("aaaaaaa");
    setPage({
      ugovori:"",
      korisnik:"1",
      favoriti:"",
      oglasi:"",
      tabela:"1",
      ocene:""
    });
  }
  console.log("profilnasidebar");
  const [isPromena,SetPromena]=useState(true);
  const handlerOglasa = ()=>{
    setPage({
      ugovori:"",
      korisnik:"1",
      favoriti:"",
      oglasi:"1",
      tabele:"",
      ocene:""
    })
  }
  const handler = ()=>{
    console.log("2");
    setPage({
      ugovori:"",
      favoriti:"",
      tabele:"",
      oglasi:"",
      korisnik:"2",
      ocene:"2"
    });
  }
  const handlerOcena = () =>{
    console.log("2");
    setPage({
      ugovori:"",
      favoriti:"",
      tabele:"",
      oglasi:"",
      korisnik:"2",
      ocene:"2"
    });
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
            
            <h3>Profile</h3>
          </MenuItem>
          <MenuItem icon={<HomeOutlinedIcon></HomeOutlinedIcon>}onClick={routeChange}>Pocetna stranica</MenuItem>
          {/* <MenuItem icon={<PeopleOutlinedIcon />}>Moji podaci</MenuItem> */}
          <MenuItem icon={<PedalBikeIcon />}onClick={handlerOglasa}>Moji oglasi</MenuItem>
          <MenuItem icon={<GavelIcon />}onClick={handlerUgovora}>Ugovori</MenuItem>
          {/* <MenuItem icon={<CalendarTodayOutlinedIcon />}>O nama</MenuItem> */}
          <MenuItem icon={<ContactsOutlinedIcon />}onClick={handlerOcena}>Ocene</MenuItem>
          <MenuItem icon = {<SettingsIcon></SettingsIcon>}>Settings</MenuItem>
          <MenuItem icon = {<ModeEditIcon></ModeEditIcon>}>Izmena podataka</MenuItem>

          {user.role=="Admin"?(<MenuItem icon ={<AdminPanelSettingsIcon></AdminPanelSettingsIcon>}onClick={handlerTabela}>AdminSettings</MenuItem>):<></>}
        </Menu>
      </Sidebar>
      <main style={{ width: '100%', height: '100%' }}>
        {page.ugovori==""?(<></>):<Ugovori></Ugovori>}
        {page.tabele==""?(<></>):<DataTable></DataTable>}
        {page.favoriti==""?(<></>):<Oglasi></Oglasi>}
        {page.oglasi==""?(<></>):<Oglasi></Oglasi>}
        {page.korisnik!=""?(<></>):<Neka></Neka>}
        {page.ocene==""?(<></>):<Expenses></Expenses>}
      </main>
      </div>
    );
}
export default Layout;