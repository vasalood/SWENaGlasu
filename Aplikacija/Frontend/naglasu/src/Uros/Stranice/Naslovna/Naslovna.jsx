import { Fragment, useEffect, useReducer } from "react";
import Header from "../../Komponente/Header/Header"
import Navbar from "../../Komponente/Navbar/Navbar"
import SearchBar from "../../Komponente/Searchbar/Searchbar";
import OglasStavka from "../../Komponente/OglasStavka/OglasStavka"

import "./Naslovna.css"
export default function Naslovna()
{

    const changeWindowWidth = 'change-window-width'
    const actionChangeWindowWidth={type:changeWindowWidth}
    function reducer(state,action)
    {
            
        if (action.type === changeWindowWidth)
            return { ...state, width: `${window.innerWidth - (window.innerWidth%440)}px` } //440 = sirina i margine zajedno
    }
    const [mainContainerStyle, dispatch] = useReducer(reducer, {
        width: `${window.innerWidth - (window.innerWidth % 440)}px`
    })

    useEffect(() =>
    {
        function resizeHandler(event) {
            dispatch(actionChangeWindowWidth)
        } 
        window.addEventListener("resize", resizeHandler)
        return ()=>window.removeEventListener("resize",resizeHandler)
    },[])
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

    const oglasNiz = []
    for (let i = 0; i !== 100; ++i)
        oglasNiz.push(oglasTemplate)
    const oglasiStavke = oglasNiz.map((o,index) =>
    {
        return <OglasStavka oglas={o} key={index} />
        //return <div>one</div>
    })
    
    return (<Fragment>
        <Navbar></Navbar>
        <Header></Header>
        <SearchBar />

        <div className="naslovna--oglasi_stavke_container" style={mainContainerStyle}>
            {oglasiStavke}
        </div>



    </Fragment>)
}