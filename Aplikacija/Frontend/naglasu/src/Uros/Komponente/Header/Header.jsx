
import MainLogo from "../../Res/Slike/main_logo1.png"
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
        const newOpacity = Math.max((100-y/2) / 100, 0)
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