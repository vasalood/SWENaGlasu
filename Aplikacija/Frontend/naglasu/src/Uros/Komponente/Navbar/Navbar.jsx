import BannerLogo from "../../Res/Slike/Logo/logo_color_transparent_hres.png"
import "./Navbar.css"
import React from "react"
import DropDownMenu from '../DropDownMenu/DropDownMenu'

import {BsChevronUp,BsChevronDown} from 'react-icons/bs'
import NavBarContext from '../../Contexts/NavBarContext'
import { Outlet } from "react-router"
import { Link } from "react-router-dom"
import ConnectionContext from "../../Contexts/ConnectionContext"
import { connect } from "formik"
import { useNavigate } from "react-router-dom"
export default function Navbar({children})
{
    const navigate = useNavigate();
        let token = localStorage.getItem('token');
    const color_secondary = '#ff3333';
    const [isCollapsable, setCollapsable] = React.useState(true)
    const [isDropdownSelected,setDropdownSelected] = React.useState(false)
    const [opacityStyle, setOpacityStyle] = React.useState({
        opacity: "0"
    })
    function isEnabledForOpacity()
    {
        return (Number.parseFloat(opacityStyle.opacity) >= 0.9)
    }
    const [isEnabled,setEnabled] = React.useState(true)
    function opacityOnScroll()
    {
        const y = window.scrollY
        const newOpacity = Math.max((y - 200) / 300, 0)
        //console.log(isCollapsable)
        if (newOpacity < 0.9&&isCollapsable)
        {
            setDropdownSelected(false)
        }

        setOpacityStyle((oldValue) => {
            
            return {
                ...oldValue,
                opacity: newOpacity.toString()
            }
        })
        
    }
    
    function SetCollapsable(value)
    {
        setCollapsable(value)
        setOpacityStyle(value===true?{opacity:'0'}:{opacity:'1'})
    }

    React.useEffect(
        () =>
        {
            window.addEventListener("scroll", opacityOnScroll)
            return ()=>window.removeEventListener("scroll",opacityOnScroll)
        },[]
    )
    const {connectionState,setConnectionState} = React.useContext(ConnectionContext)
    const handleLogout = () =>{
       
        localStorage.removeItem('token');
        localStorage.removeItem('page');
        localStorage.removeItem('userState');
        if (connectionState != null && typeof connectionState.close === 'function') {
            connectionState.close();
          }
          else
          {
            window.location.reload();
          }
          setConnectionState(null);
    }
    let menuItems=[];
        if(token)
        {
            menuItems = [
                <Link to="/test">Profil</Link>,
                <Link to="/postavioglas">Nov oglas</Link>,
                <Link to='/chat/0'>Inbox</Link>,
                <Link to="/" onClick={handleLogout}>Logout</Link>]
        }
        else
        {
            menuItems = [
                <Link to="/login">Login</Link>,
                <Link to="/signup">Sign up</Link>
            ]
        }

    
    return (
       <NavBarContext.Provider value=
        {
            {
                opacityStyle: opacityStyle,
                navbarSetCollapsable: SetCollapsable,
                navbarSetEnabled:setEnabled
            }
        }>
            {isEnabled && <nav className="mnavbar" style={isCollapsable ? opacityStyle : { opacity: '1' }}>
               <Link to='/'> <img className="mnavbar--banner" src={BannerLogo}></img></Link>
                <DropDownMenu
                    ButtonIconOn={<BsChevronUp size={35} style={{color:"#3B82F6"}} />}
                    ButtonIconOff={<BsChevronDown size={35} style={{color:"#3B82F6"}} />}
                    items={menuItems}
                    className="mnavbar--dropdown"
                    isSelected={isDropdownSelected}
                    toggleSelected={setDropdownSelected}
                    buttonDisabled={isCollapsable?!isEnabledForOpacity():false}></DropDownMenu>
            </nav>}
            {/*  {children} */}
            <Outlet/>
        </NavBarContext.Provider>
        
    )
}