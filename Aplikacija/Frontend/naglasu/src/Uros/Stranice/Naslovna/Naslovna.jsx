import { useEffect, useReducer } from "react";
import Header from "./Komponente/Header/Header"
import SearchBar from "./Komponente/Searchbar/Searchbar";
import OglasStavka from "./Komponente/OglasStavka/OglasStavka"
import React from 'react'
import "./Naslovna.css"
import { useLoaderData } from "react-router";
import NavBarContext from "../../Contexts/NavBarContext";
import NaslovnaContext from "../../Contexts/NaslovnaContext";
import { useLocation } from 'react-router-dom'
import * as SignalR from '@microsoft/signalr'
import ConnectionContext from "../../Contexts/ConnectionContext";
import { Link } from 'react-router-dom'
import BuildChatHubConnection from "../../Utils/ChatHubConnectionBuilder";
const changeWindowWidth = 'change-window-width'
const actionChangeWindowWidth = { type: changeWindowWidth }

const ROOT_API_URL = "http://localhost:5105/"

function reducer(state,action)
{
        
    if (action.type === changeWindowWidth)
        return { ...state, width: `${window.innerWidth - (window.innerWidth%440)}px` } //440 = sirina i margine zajedno
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
    const {connectionState,setConnectionState,handleMsgRcv}=React.useContext(ConnectionContext)

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

    const { navbarSetCollapsable } = React.useContext(NavBarContext)
    React.useEffect(() => {
        
        navbarSetCollapsable(true)
        return ()=>navbarSetCollapsable(false)
    }, [])
    
   
    const fromLocUkupanBr = useLocation().state?.ukupanBr


    return (
        
        <div className="naslovna">
            <Link to='/chat/0/40013/8e8a68cb-8f41-47a7-ab69-7467236bc88e'>OVDE</Link>
            <NaslovnaContext.Provider value= 
            {
                {
                    trenutnaStranica: trenutnaStranica,
                    ukupanBr: ukupanBr !== undefined ? ukupanBr : fromLocUkupanBr,
                }
            }>
                <Header/>
                <SearchBar />
                <div className="naslovna--oglasi_stavke_container" style={mainContainerStyle}>
                    {oglasiStavke}
                </div>
            </NaslovnaContext.Provider>
        </div>
    )
}