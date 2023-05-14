import { Fragment } from "react";
import "./Searchbar.css"
import React from 'react'
import { BsSearch,BsFilter,BsChevronRight,BsChevronLeft} from 'react-icons/bs'
import NavBarContext from "../../Contexts/NavBarContext"

export default function SearchBar()
{
    const navButtonStyle = 
    {
        color:"white"
    }

    const {opacityStyle}=React.useContext(NavBarContext)
    return (
        <div className='searchbar--container' style={opacityStyle}>
            <button className="searchbar--nav_btn searchbar--prev_btn">
                    <BsChevronLeft size={35} style={navButtonStyle} />
                </button>
            <div className='searchbar--wrapper'>
                
            <input type="text" className='searchbar--input' placeholder="Pretraga..." ></input>
                <button className='searchbar--filter_btn'>
                    <BsFilter size={30}/>
        </button>
            <button className='searchbar--search_btn'>
                    <BsSearch size={30} />
                </button>
            </div>  
            <button className="searchbar--nav_btn searchbar--next_btn" style={navButtonStyle}>
            <BsChevronRight size={35} />
        </button>
    </div>)
}