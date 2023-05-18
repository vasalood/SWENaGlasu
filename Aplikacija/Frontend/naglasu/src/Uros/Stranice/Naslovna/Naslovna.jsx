import { Fragment, useEffect, useReducer } from "react";
import Header from "../../Komponente/Header/Header"
import Navbar from "../../Komponente/Navbar/Navbar"
import SearchBar from "../../Komponente/Searchbar/Searchbar";
import OglasStavka from "../../Komponente/OglasStavka/OglasStavka"
import React from 'react'
import "./Naslovna.css"
import SearchBarContext from '../../Contexts/NavBarContext'
import { useLoaderData } from "react-router";

const changeWindowWidth = 'change-window-width'
const actionChangeWindowWidth = { type: changeWindowWidth }

const ROOT_API_URL = "http://localhost:5105/"

function reducer(state,action)
{
        
    if (action.type === changeWindowWidth)
        return { ...state, width: `${window.innerWidth - (window.innerWidth%440)}px` } //440 = sirina i margine zajedno
}


const oglasTemplate = 
{
    id: 7,
    ime: "oglas test",
    podkategorija: {
      ime: "string",
      id: 1,
      kategorijaId: 1,
      kategorijaNaziv: "string"
    },
    polja: {
      string: "string"
    },
    kredit: 1231231,
    datumPostavljanja: "2023-05-14T22:42:03.2330115",
    smer: 0,
    tip: 0,
    cena: 12321312,
    kolicina: 12,
    brojPregleda: 0,
    vlasnikUsername: "VELJKO",
    vlasnikId: "bcda",
    lokacija: "Novi Sad",
    stanje: 1,
    slikeZaSlanje: [
      {
        naziv: "5fVVaFByxe5pUU09s9wQ.png",
        redosled: 0
      },
      {
        naziv: "ohPk1wonmR8oJjw41bGE.jpg",
        redosled: 1
        }
    ]
}


export async function naslovnaLoader()
{
    const response1 =
        await fetch("http://localhost:5105/Oglas/VratiMTihNOglasa/10/0/popularnost/0",
            {
                method: "POST",
                headers:
                {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(
                    {

                    }
                )
            })
    if (response1.ok)
    {
            const response1JSON = await response1.json()
            const oglasi = response1JSON.lista
            const ukupanBr = response1JSON.ukupanBr
            return oglasi
    }
    else
        throw Error("Bad request.")
}

export async function naslovnaAction()
{

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
    
   

    const oglasNiz = useLoaderData()/* []
    for (let i = 0; i !== 100; ++i)
        oglasNiz.push(oglasTemplate) */
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