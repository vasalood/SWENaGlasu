import { Fragment } from "react";
import "./Searchbar.css"
import React from 'react'
import { BsSearch,BsFilter,BsChevronRight,BsChevronLeft,BsSortDownAlt} from 'react-icons/bs'
import NavBarContext from "../../../../Contexts/NavBarContext"
import FilterWindow from "../FilterWindow/FilterWindow";
import { Link } from 'react-router-dom'
import SortWindow from "../SortWindow/SortWindow";
import NaslovnaContext from "../../../../Contexts/NaslovnaContext";

export default function SearchBar()
{

    const emptykat = {id:'',ime:'Prazno', podkategorije: [
           
    ]}
    const filterStanjaTemplate =
    {
        ime:'',
        kategorije:[emptykat],
        selectedKat: emptykat,
        selectedPodkat: [],
        selectedSmer: '',
        selectedTip: '',
        selectedStanja: [],
        cenaOd: '',
        cenaDo: '',
        lokacija: '',
        stringify: function () 
        {
            let retValue = ''
            retValue+=this.ime!==''?'ime='+this.ime:''
            retValue += this.selectedKat.id != '' ? `kategorijaId=${this.selectedKat.id}` : ''
            if (this.selectedPodkat.length > 0)
            {
                let selectedPodkatString='&podkategorijeId='
                this.selectedPodkat.forEach((pk,index) =>
                {
                    selectedPodkatString += pk.id
                    selectedPodkatString+=index!=this.selectedPodkat.length-1?'_':''
                    })
                retValue+=selectedPodkatString
            }
            retValue += this.selectedSmer!=''?`&smer=${this.selectedSmer}`:''
            retValue +=this.selectedTip!=''? `&tip=${this.selectedTip}`:''
            if (this.selectedStanja.length > 0)
            {
                let selectedStanjaString='&stanja='
                this.selectedStanja.forEach((s,index) =>
                {
                    selectedStanjaString += s
                    selectedStanjaString+=index!=this.selectedStanja.length-1?'_':''
                    })
                retValue+=selectedStanjaString
            }
            retValue += this.cenaDo !== '' ? `&cenaDo=${this.cenaDo}` : ''
            retValue += this.cenaOd !== '' ? `&cenaOd=${this.cenaOd}` : ''
            retValue+=this.lokacija!==''?`&lokacija=${this.lokacija}`:''
            return retValue
        }
    }
    
    const navButtonStyle = 
    {
        color:"white"
    }


    const [filterStanja, seterFilterStanja] = React.useState(filterStanjaTemplate)
    const [sortStanja, seterSortStanja] = React.useState(
        {
            orderBy: '',
            orderType: 0,
            brojOglasa:20
        }
    )
    const stringFilterStanja = filterStanja.stringify()

    const [filterWindowActive, setFilterWindowActive] = React.useState(false)
    const [sortWindowActive,setSortWindowActive]=React.useState(false)
    const { opacityStyle } = React.useContext(NavBarContext)
    const {trenutnaStranica, ukupanBr }=React.useContext(NaslovnaContext)
    const maxStranica = (ukupanBr / sortStanja.brojOglasa) >> 0
    return (
        <div className='searchbar--container' style={opacityStyle}>
            {trenutnaStranica !== 0?
                <Link to={`/${sortStanja.brojOglasa}/${trenutnaStranica - 1}/` +
                    `${sortStanja.orderBy !== '' ? sortStanja.orderBy : 'kredit'}` +
                    `/${sortStanja.orderType}/${stringFilterStanja
                    }`} state={{ ukupanBr: ukupanBr }}>
                    <button className="searchbar--nav_btn searchbar--prev_btn">
                        <BsChevronLeft  size={35}  style={{color:'#3B82F6', fontWeight:'bold',navButtonStyle}} />
                    </button>
                </Link> : <div className="searchbar--nav_btn" />
            }
            <div className='searchbar--wrapper'>
                
                <input type="text" className='searchbar--input' placeholder="Pretraga..."
                    onChange={(ev) => {
                        seterFilterStanja(oldValue => {
                            return {
                                ...oldValue,
                                ime: ev.target.value
                            }
                        })
                    }}
                    value={filterStanja.ime}></input>
                <button className='searchBar--sort_btn'>
                    <BsSortDownAlt size={30} onClick={(ev) => setSortWindowActive(
                        oldValue => !oldValue
                    )} />
                </button>
                <button className='searchbar--filter_btn' onClick={(ev) => {
                    setFilterWindowActive(oldValue => !oldValue)
                }
                }>
                    <BsFilter size={30}/>
                </button>
                <Link to={`/${sortStanja.brojOglasa}/0/${sortStanja.orderBy !== '' ? sortStanja.orderBy : 'kredit'}` +
                    `/${sortStanja.orderType}/${
                            stringFilterStanja
                    }`}>
                <button className='searchbar--search_btn'>
                    <BsSearch size={30} />
                </button>
                </Link>
           
            </div>  
            {trenutnaStranica !== maxStranica?
                <Link to={`/${sortStanja.brojOglasa}/${trenutnaStranica +1}/` +
                `${sortStanja.orderBy !== '' ? sortStanja.orderBy : 'kredit'}` +
                `/${sortStanja.orderType}/${
                        stringFilterStanja
                    }`} state={{ukupanBr:ukupanBr}}>
                    <button className="searchbar--nav_btn searchbar--next_btn" style={navButtonStyle}>
                        <BsChevronRight style={{color:'#3B82F6', fontWeight:'bold'}} size={35} />
                    </button>
                    
                </Link>:<div className='searchbar--nav_btn'/>}
            <FilterWindow active={filterWindowActive} setActive={setFilterWindowActive} stanja={filterStanja}
                seterStanja={seterFilterStanja} />
            <SortWindow active={sortWindowActive} setActive={setSortWindowActive} stanja={sortStanja } seterStanja={seterSortStanja} />
    </div>)
}