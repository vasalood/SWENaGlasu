import { Fragment, useEffect, useReducer } from "react";
import Header from "../../Komponente/Header/Header"
import Navbar from "../../Komponente/Navbar/Navbar"
import SearchBar from "../../Komponente/Searchbar/Searchbar";
import OglasStavka from "../../Komponente/OglasStavka/OglasStavka"
import React from 'react'
import "./Naslovna.css"
import SearchBarContext from '../../Contexts/NavBarContext'

const changeWindowWidth = 'change-window-width'
const actionChangeWindowWidth = { type: changeWindowWidth }

function reducer(state,action)
{
        
    if (action.type === changeWindowWidth)
        return { ...state, width: `${window.innerWidth - (window.innerWidth%440)}px` } //440 = sirina i margine zajedno
}


const oglasTemplate = 
{
        slika:
        {
            url:null,naziv:"1.jpg"
        },
        naziv: "Oglas za testiranje naziv oglasa",
        vlasnik:
        {
            username: "user123",
            id:"abcd"
        },
        opis: "opis",
        cena: "123",
        kolicina:1
}




export default function Naslovna()
{
    
    const stavkaWidth=window.innerWidth>450?440:320
    const [mainContainerStyle, dispatch] = useReducer(reducer, {
        width: `${window.innerWidth - (window.innerWidth % stavkaWidth)}px`
    })

    useEffect(() =>
    {
        function resizeHandler(event) {
            dispatch(actionChangeWindowWidth)
        } 
        window.addEventListener("resize", resizeHandler)
        return ()=>window.removeEventListener("resize",resizeHandler)
    }, [])
    
   

    const oglasNiz = []
    for (let i = 0; i !== 100; ++i)
        oglasNiz.push(oglasTemplate)
    
    const oglasiStavke = oglasNiz.map((o,index) =>
    {
        return <OglasStavka oglas={o} key={index} />
    })
    
    const [opacityStyle, setOpacityStyle] = React.useState({
        opacity: "0"
    })

    function opacityOnScroll()
    {
        const y = window.scrollY
        const newOpacity = Math.max((y - 200) / 300, 0)
        if (newOpacity < 1.0)
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

    React.useEffect(
        () =>
        {
            window.addEventListener("scroll", opacityOnScroll)
            return ()=>window.removeEventListener("scroll",opacityOnScroll)
        },[]
    )

    const [isDropdownSelected, setDropdownSelected] = React.useState(false)



    return (
        <SearchBarContext.Provider value=
            {
            {
                opacityStyle: opacityStyle,
                isDropdownSelected: isDropdownSelected,
                setDropdownSelected: setDropdownSelected
            }
        }>
        <Navbar></Navbar>
        <Header></Header>
        <SearchBar />

        <div className="naslovna--oglasi_stavke_container" style={mainContainerStyle}>
            {oglasiStavke}
        </div>



    </SearchBarContext.Provider>)
}