import { Fragment, useEffect, useReducer } from "react";
import Header from "../../Komponente/Header/Header"
import Navbar from "../../Komponente/Navbar/Navbar"
import SearchBar from "../../Komponente/Searchbar/Searchbar";
import OglasStavka from "../../Komponente/OglasStavka/OglasStavka"
import React from 'react'
import "./Naslovna.css"
import SearchBarContext from '../../Contexts/NavBarContext'
import { useLoaderData } from "react-router";
import NavBarContext from "../../Contexts/NavBarContext";
import NaslovnaContext from "../../Contexts/NaslovnaContext";
import { useLocation } from 'react-router-dom'

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


export async function naslovnaLoader({params})
{
    const requestUrl = ROOT_API_URL + `Oglas/VratiMtihNOglasa/${params.N != undefined ? params.N : 20}/
    ${params.M != undefined ? params.M : 0}/${params.orderBy != undefined ? params.orderBy : 'kredit'}/
    ${params.orderType != undefined ? params.orderType :
            0}`
    const filtersArray = params.filters != undefined ? params.filters.split('&') : []
    
    const filters = {}
    if (filtersArray.length != 0)
    {
        filtersArray.forEach(kv =>
        {
                
            const kvTmp = kv.split('=')
            if (kvTmp[0] === 'stanja' || kvTmp[0] === 'podkategorijeId')
            {
                kvTmp[1] = kvTmp[1].split('_')
                kvTmp[1] = kvTmp[1].map(v => {
                    return Number.parseInt(v)
                })
            }
            else if(!isNaN(kvTmp[1]))
            {
                kvTmp[1]=Number.parseInt(kvTmp[1])     
            }
            filters[kvTmp[0]] =kvTmp[1]
            
            })
        
    }
    const response1 =
        await fetch(requestUrl,
            {
                method: "POST",
                headers:
                {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(
                    filters
                )
            })
    if (response1.ok)
    {
            const response1JSON = await response1.json()
            const oglasi = response1JSON.lista
            const ukupanBr = response1JSON.ukupanBr
        return {
            oglasNiz: oglasi,
            ukupanBr: ukupanBr,
            trenutnaStranica: params.M!==undefined?Number.parseInt(params.M):0
        }
    }
    else
    {
        response1.text().then(text=>console.log('Error is '+text))
        throw Error('Bad Request!')
    }

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
    
   

    const { oglasNiz, trenutnaStranica,ukupanBr } = useLoaderData()

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
    const fromLocUkupanBr = useLocation().state?.ukupanBr


    return (
        <div className="naslovna">
            <NavBarContext.Provider value=
            {
                {
                opacityStyle: opacityStyle,
                isDropdownSelected: isDropdownSelected,
                setDropdownSelected: setDropdownSelected
                }
            }>
                <NaslovnaContext.Provider value= 
                {
                    {
                        trenutnaStranica: trenutnaStranica,
                        ukupanBr: ukupanBr !== undefined ? ukupanBr : fromLocUkupanBr,
                    }
                }>
                    <Navbar></Navbar>
                    <Header></Header>
                    <SearchBar />

                    <div className="naslovna--oglasi_stavke_container" style={mainContainerStyle}>
                        {oglasiStavke}
                    </div>
                </NaslovnaContext.Provider>
    </NavBarContext.Provider>
        </div>
    )
}