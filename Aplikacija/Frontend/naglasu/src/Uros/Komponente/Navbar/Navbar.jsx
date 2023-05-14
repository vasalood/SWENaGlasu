import BannerLogo from "../../Res/Slike/Logo/logo_color_transparent_hres.png"
import "./Navbar.css"
import React from "react"
import DropDownMenu from '../DropDownMenu/DropDownMenu'

import {BsChevronUp,BsChevronDown} from 'react-icons/bs'
import NavBarContext  from '../../Contexts/NavBarContext'

export default function Navbar()
{

    const color_secondary = '#ff3333';
    const {opacityStyle,isDropdownSelected,setDropdownSelected} = React.useContext(NavBarContext)
    
    

    const menuItems = [
    <a href="/">PROFIL</a>,
    <a href="/">FAVORITI</a>,
    <a href="/">UGOVORI</a>,
    <a href="/">ODJAVA</a>]

    
    return (<nav className="nav " style={opacityStyle}>
        <img className="nav--banner" src={BannerLogo}></img>
       {/*  <ul className="nav--ul">
            <li>PROFIL</li>
            <li>FAVORITI</li>
            <li>UGOVORI</li>
            <li>ODJAVA</li>
        </ul> */}
        <DropDownMenu
            ButtonIconOn={<BsChevronUp size={35} color={color_secondary}/>}
            ButtonIconOff={<BsChevronDown size={35} color={color_secondary}/>}
            items={menuItems}
            className="nav--dropdown"
            isSelected={isDropdownSelected}
            toggleSelected={setDropdownSelected}
            buttonDisabled={Number.parseFloat(opacityStyle.opacity)<1.0}></DropDownMenu>
    </nav>)
}