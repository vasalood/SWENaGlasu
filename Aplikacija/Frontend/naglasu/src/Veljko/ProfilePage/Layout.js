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
import { Navigate, useNavigate } from "react-router-dom";
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
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import TabelaModerator from './TabelaModerator';
import App3 from './UgovoriBootStrap';
import Favoriti from "./Favoriti";
const Layout =() =>{
  const navigate =useNavigate();

  const authCtx = useContext(AuthContext);
  const [page, setPage] = useState({
    favoriti:"",
    tabele:"",
    ugovori:"",
    oglasi:"",
    korisnik:"",
    ocene:"",
    izmene:"",
    moderator:""
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
      ocene:"",
      izmene:"",
      moderator:""
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
      ocene:"",
      izmene:"",
      moderator:""
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
      ocene:"",
      izmene:"",
      moderator:""
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
      ocene:"2",
      izmene:"",
      moderator:""
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
      ocene:"2",
      izmene:"",
      moderator:""
    });
  }
  const handlerIzmena = () =>{
    console.log("2");
    setPage({
      ugovori:"",
      favoriti:"",
      tabele:"",
      oglasi:"",
      korisnik:"2",
      ocene:"",
      izmene:"2",
      moderator:""
    });
  }
  let navigacija = useNavigate();
  const routeChange = () =>{
    let path = `/`;
    navigacija(path);
    console.log("hahahah");
  }
  const expenses = [
    {
      id: 'e1',
      title: 'Toilet Paper',
      amount: 4,
      date: new Date(2020, 7, 14),
      korisnik:"veljkovv",
      komentar:"Katastrofa, prevario me je"
    },
    { id: 'e2', title: 'New TV', amount: 2, date: new Date(2021, 2, 12),korisnik:"Jasar Muhildzic", komentar:"Odlican posao smo sklopili"},
    {
      id: 'e3',
      title: 'Car Insurance',
      amount: 3,
      date: new Date(2021, 2, 28),
      korisnik:"Ana Jovanovic",
      komentar:"Sve preporuke za saradnju"
    },
    {
      id: 'e4',
      title: 'New Desk (Wooden)',
      amount: 5,
      date: new Date(2021, 5, 12),
      korisnik:"milos",
      komentar:"Sve iz oglasa ispostovano"
    },
  ];
const handlerLogout = () =>{
  authCtx.logout();
  console.log(authCtx.token);

  dispatch(userActions.resetValues());
  console.log(userActions.getValues());

  // Remove user state from localStorage
  localStorage.removeItem("userState");
  localStorage.removeItem('token');
  navigate('/');
}
const handlerModerator = () =>{
  setPage({
    ugovori:"",
    favoriti:"",
    tabele:"",
    oglasi:"",
    korisnik:"2",
    ocene:"",
    izmene:"",
    moderator:"2"
  });
}
const handlerMoji = () =>{
  setPage({
    ugovori:"",
    favoriti:"",
    tabele:"",
    oglasi:"",
    korisnik:"",
    ocene:"",
    izmene:"",
    moderator:""
  });
}
  const { collapseSidebar } = useProSidebar();
    if(savedUserState)
    {  
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
          <MenuItem icon={<PeopleOutlinedIcon />} onClick={handlerMoji}>Moji podaci</MenuItem>
          <MenuItem icon={<PedalBikeIcon />}onClick={handlerOglasa}>Oglasi koje pratim</MenuItem>
          <MenuItem icon={<GavelIcon />}onClick={handlerUgovora}>Ugovori</MenuItem>
          {/* <MenuItem icon={<CalendarTodayOutlinedIcon />}>O nama</MenuItem> */}
          <MenuItem icon={<ContactsOutlinedIcon />}onClick={handlerOcena}>Ocene</MenuItem>
          {/* <MenuItem icon = {<SettingsIcon></SettingsIcon>}>Settings</MenuItem> */}
          <MenuItem icon = {<ModeEditIcon></ModeEditIcon>}onClick={handlerIzmena}>Izmena podataka</MenuItem>

          {user.role=="Admin"?(<MenuItem icon ={<AdminPanelSettingsIcon></AdminPanelSettingsIcon>}onClick={handlerTabela}>AdminSettings</MenuItem>):<></>}
          {user.role=="Moderator"?(<MenuItem icon ={<AddModeratorIcon></AddModeratorIcon>}onClick={handlerModerator}>Moderator Settings</MenuItem>):<></>}

          <MenuItem icon = {<LogoutIcon></LogoutIcon>}onClick={handlerLogout}>Logout</MenuItem>
        </Menu>
      </Sidebar>
      <main style={{ width: '100%', height: '100%' }}>
        {page.ugovori==""?(<></>):<App3></App3>}
        {page.tabele==""?(<></>):<DataTable></DataTable>}
        {page.favoriti==""?(<></>):<Oglasi></Oglasi>}
        {page.oglasi==""?(<></>):<Favoriti></Favoriti>}
        {page.korisnik!=""?(<></>):<Neka></Neka>}
        {page.ocene==""?(<></>):<Expenses items={expenses}></Expenses>}
        {page.izmene==""?(<></>):<EditPage></EditPage>}
        {page.moderator==""?(<></>):<TabelaModerator></TabelaModerator>}
        
      </main>
      </div>
    );
          }
          else{
            return<div>{user.address}</div>
          }
}
export default Layout;