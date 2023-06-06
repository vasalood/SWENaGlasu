import BannerLogo from "../../Res/Slike/Logo/logo_color_transparent_hres.png"
import "./Navbar.css"
import React from "react"
import DropDownMenu from '../DropDownMenu/DropDownMenu'

import {BsChevronUp,BsChevronDown} from 'react-icons/bs'
import NavBarContext  from '../../Contexts/NavBarContext'

export default function Navbar({children})
{

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


    const menuItems = [
    <a href="/">PROFIL</a>,
    <a href="/">FAVORITI</a>,
    <a href="/">UGOVORI</a>,
    <a href="/">ODJAVA</a>]

    
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
                <img className="mnavbar--banner" src={BannerLogo}></img>
                <DropDownMenu
                    ButtonIconOn={<BsChevronUp size={35} color={color_secondary} />}
                    ButtonIconOff={<BsChevronDown size={35} color={color_secondary} />}
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