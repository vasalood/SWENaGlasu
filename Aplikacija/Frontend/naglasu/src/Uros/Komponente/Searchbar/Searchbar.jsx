import { Fragment } from "react";
import "./Searchbar.css"
import React from 'react'

export default function SearchBar({classPrefix})
{
    const stickyState = {
        position: "static"
    }
    const [isSticky, setSticky] = React.useState(stickyState)
    function searchBarScrollHandler()
    {
       /*  const y = window.scrollY
        if (y >100)
            setSticky({position: "sticky", top:y.toString()})
        else
            setSticky({position: "static"}) */
    }

    React.useEffect(
        () => {
            window.addEventListener("scroll", searchBarScrollHandler)
            return ()=>window.removeEventListener("scroll",searchBarScrollHandler)
        },[]
            
    )
    return (
        <div className={`${classPrefix}--searchbar_container`}>
        <input type="text" className={`${classPrefix}--searchbar`} placeholder="Pretraga..." style={isSticky}></input>
    </div>)
}