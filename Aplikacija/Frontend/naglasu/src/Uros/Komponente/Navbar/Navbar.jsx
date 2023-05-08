import BannerLogo from "../../Res/Slike/banner_logo.png"
import "./Navbar.css"
import React from "react"


export default function Navbar()
{
    const mStyle = {
        opacity: "0"
    }
    const [opacity, setOpacity] = React.useState(mStyle)

    function navOnScroll()
    {
        const y = window.scrollY
        const newOpacity = Math.max((y - 100) / 200, 0)
        setOpacity({
            opacity:newOpacity.toString()
        })
        
    }   

    React.useEffect(
        () =>
        {
            window.addEventListener("scroll", navOnScroll)
            return ()=>window.removeEventListener("scroll",navOnScroll)
        },[]
    )
 
    return (<nav className="nav " style={opacity}>
        <img className="nav--banner" src={BannerLogo}></img>
        <ul className="nav--ul">
            <li>PROFIL</li>
            <li>FAVORITI</li>
            <li>UGOVORI</li>
            <li>ODJAVA</li>
        </ul>
    </nav>)
}