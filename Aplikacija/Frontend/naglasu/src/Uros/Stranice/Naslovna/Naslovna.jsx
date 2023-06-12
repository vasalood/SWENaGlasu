import { useEffect, useReducer } from "react";
import Header from "./Komponente/Header/Header"
import SearchBar from "./Komponente/Searchbar/Searchbar";
import OglasStavka from "./Komponente/OglasStavka/OglasStavka"
import React from 'react'
import "./Naslovna.css"
import { useLoaderData } from "react-router";
import NavBarContext from "../../Contexts/NavBarContext";
import PaginationContext from "../../Contexts/PaginationContext";
import { useLocation } from 'react-router-dom'
import * as SignalR from '@microsoft/signalr'
import ConnectionContext from "../../Contexts/ConnectionContext";
import { Link } from 'react-router-dom'
import BuildChatHubConnection from "../../Utils/ChatHubConnectionBuilder";
import KarticaOglasNova from "../../../Veljko/ProfilePage/KarticaOglasNova";
const changeWindowWidth = 'change-window-width'
const actionChangeWindowWidth = { type: changeWindowWidth }
const ROOT_API_URL = "http://localhost:5105/"


export async function naslovnaLoader({params})
{
    const requestUrl = ROOT_API_URL + `Oglas/VratiMtihNOglasa/${params.N != undefined ? params.N : 12}/
    ${params.M != undefined ? params.M : 0}/${params.orderBy != undefined ? params.orderBy : 'kredit'}/
    ${params.orderType != undefined ? params.orderType :
            1}`
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
        //console.log(filters)
        
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
            trenutnaStranica: params.M !== undefined ? Number.parseInt(params.M) : 0,
            filters:(M)=>`${params.N != undefined ? params.N : 12}/${M}/${params.orderBy != undefined ? params.orderBy : 'kredit'}/`+
            `${params.orderType != undefined ? params.orderType :1}${params.filters!=undefined?('/'+params.filters):''}`
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
    const { connectionState, setConnectionState, handleMsgRcv, handleContractUpdate } = React.useContext(ConnectionContext)
    const { oglasNiz, trenutnaStranica,ukupanBr,filters } = useLoaderData()

    const [ukupanBrState,setUkupanBrState] = React.useState(ukupanBr)
    
    const { navbarSetCollapsable } = React.useContext(NavBarContext)
    React.useEffect(() => {
        
        navbarSetCollapsable(true)
        return ()=>navbarSetCollapsable(false)
    }, [])
    
   
    const fromLocUkupanBr = useLocation().state?.ukupanBr
    React.useEffect(() =>
    {
        async function temp()
        {
            console.log(fromLocUkupanBr)
            if (ukupanBr == undefined && fromLocUkupanBr != null)
            {
                setUkupanBrState(fromLocUkupanBr)
            }
            else if (fromLocUkupanBr == null && ukupanBr == undefined)
            {
                const res = await fetch('http://localhost:5105/Oglas/PrebrojiOglaseZaFiltere',         {
                    method: "POST",
                    headers:
                    {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(
                        filters
                    )
                }) 
                const result = await res.text()
                if (!res.ok)
                {
                    console.log(result)
                    return
                }
                else
                {
                    setUkupanBrState(Number.parseInt(result))
                    
                }
            }
        }
        temp()
       
    },[])
    useEffect(() =>
  {
    const userState= localStorage.getItem('userState')
    if (userState != null)
    {
        if (connectionState == null || connectionState.disconnected)
        {
            BuildChatHubConnection(setConnectionState, connectionState, handleMsgRcv, handleContractUpdate)
            //console.log('connected user: '+userState)
        }
    }

  },[])

    return (
        
        <div className="naslovna">
            <PaginationContext.Provider value= 
            {
                {
                    trenutnaStranica: trenutnaStranica,
                    ukupanBr: ukupanBrState,
                    currentFilters:{filters}
                }
            }>
                <Header/>
                <SearchBar currentFilters={filters} />
                <>
    <div className="container grid grid--3-cols margin-right-md oglasiKartica" >
        {oglasNiz.map((oglas) => (
          <KarticaOglasNova key={oglas.id} oglas={oglas} slika={oglas.slikeZaSlanje} />
        ))}
        </div>
      </>
            </PaginationContext.Provider>
        </div>
    )
}