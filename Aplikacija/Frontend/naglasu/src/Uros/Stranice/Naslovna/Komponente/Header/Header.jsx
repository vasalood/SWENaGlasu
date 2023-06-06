
import MainLogo from "../../../../Res/Slike/Logo/logo_color_transparent_hres.png"
import React from "react"
import "./Header.css"

export default function Header(props)
{
    const mStyle = {
        opacity: "1"
    }
    const [opacity, setOpacity] = React.useState(mStyle)

    function headerOnScroll()
    {
        const y = window.scrollY
        const newOpacity = Math.max((125-y/4) / 100, 0)
        setOpacity({
            opacity:newOpacity.toString()
        })
        
    } 

    React.useEffect(
        () =>
        {
            window.addEventListener("scroll", headerOnScroll)
            return ()=>window.removeEventListener("scroll",headerOnScroll)
        },[]
    )
    return (<header className="header" style ={opacity}>
        <img className="header--logo" src={MainLogo} />
        <h1 className="header--about">Dobrodošli na razglasnu tablu Srbije.</h1>
    </header>)
}