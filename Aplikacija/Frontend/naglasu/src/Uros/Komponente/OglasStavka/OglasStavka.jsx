import React, { Fragment } from 'react'
import placeholder_image from '../../Res/Slike/placeholder.jpg'
import "./OglasStavka.css"
export default function OglasStavka({ oglas })
{
   
    
    return (
        <div className='oglas--container'>
            <img src={oglas.slika.url!=null&&oglas.slika.url!=undefined?oglas.slika.url:placeholder_image} id={oglas.slika.ime} className="oglas--img" />
            <h3 className='oglas--naziv'>{oglas.naziv}</h3>
            <h4 className='oglas--od'>Od: <span className='oglas--vlasnik'>{oglas.vlasnik.username}</span></h4>
            <div className="oglas--specifikacije_container">
                <h5>{oglas.cena} din.</h5>
                <h5>Kolicina: {oglas.kolicina}</h5>
            </div>

        </div>
    )
}