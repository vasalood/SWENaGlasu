import React, { Fragment } from 'react'
import placeholder_image from '../../../../Res/Slike/placeholder.jpg'
import "./OglasStavka.css"
export default function OglasStavka({ oglas })
{
    const slikaKontrolerMetoda = "http://localhost:5105/Oglas/VratiSliku/" 
    const slika = oglas.slikeZaSlanje.filter(s => s.redosled == 0)[0]
    return (
        <div className='oglas--container'>
            <img src={
                slika != null && slika != undefined ? slikaKontrolerMetoda + slika.naziv : placeholder_image} id={slika?.naziv}
                className="oglas--img" />
            <h3 className='oglas--naziv'>{oglas.ime}</h3>
            <h4 className='oglas--od'>Od: <span className='oglas--vlasnik'>{oglas.vlasnikUsername}</span></h4>
            <div className="oglas--specifikacije_container">
                <h4>{oglas.cena} din.</h4>
                <h4>Kolicina: {oglas.kolicina}</h4>
            </div>

        </div>
    )
}