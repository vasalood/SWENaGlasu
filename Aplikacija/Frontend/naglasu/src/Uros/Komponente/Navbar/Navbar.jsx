import BannerLogo from "../../Res/Slike/Logo/logo_color_transparent_hres.png"
import "./Navbar.css"
import React from "react"
import DropDownMenu from '../DropDownMenu/DropDownMenu'

import {BsChevronUp,BsChevronDown} from 'react-icons/bs'
import NavBarContext  from '../../Contexts/NavBarContext'

export default function Navbar({children})
{
        let token = localStorage.getItem('token');
    const color_secondary = '#ff3333';
    const [isCollapsable, setCollapsable] = React.useState(true)
    const [isDropdownSelected,setDropdownSelected] = React.useState(false)
    const [opacityStyle, setOpacityStyle] = React.useState({
        opacity: "0"
    })
    const [isEnabled,setEnabled] = React.useState(true)
    function opacityOnScroll()
    {
        const y = window.scrollY
        const newOpacity = Math.max((y - 200) / 300, 0)
        if (newOpacity < 1.0&&isCollapsable)
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
    const handleLogout = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('page');
        localStorage.removeItem('userState');
    }
    let menuItems=[];
        if(token)
        {
            menuItems = [
                <a href="/test">Profil</a>,
                <a href="/postavioglas">Nov oglas</a>,
                <a href="/" onClick={handleLogout}>Logout</a>];
        }
        else
        {
            menuItems = [
                <a href="/login">Login</a>,
                <a href="/signup">Sign up</a>
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
               <a href='/'> <img className="mnavbar--banner" src={BannerLogo}></img></a>
                <DropDownMenu
                    ButtonIconOn={<BsChevronUp size={35} style={{color:"#3B82F6"}} />}
                    ButtonIconOff={<BsChevronDown size={35} style={{color:"#3B82F6"}} />}
                    items={menuItems}
                    className="mnavbar--dropdown"
                    isSelected={isDropdownSelected}
                    toggleSelected={setDropdownSelected}
                    buttonDisabled={Number.parseFloat(opacityStyle.opacity) < 1.0}></DropDownMenu>
            </nav>}
            {children}
        </NavBarContext.Provider>
        
    )
}