import React from "react";
import { useState, useContext } from "react";
import { useLoaderData } from "react-router";
import { Link } from 'react-router-dom';
import './Oglas.css';
import PlaceHolder from "../../Uros/Res/Slike/placeholder.jpg";
import NavBarContext from "../../Uros/Contexts/NavBarContext";

export async function OglasLoader({params}) {
  if(params.oglasId == undefined) throw Error('GRESKA');
  const responseZaBrPregleda = await fetch(`http://localhost:5105/Oglas/InkrementOglasPregledi/${params.oglasId}`,
  {
    method: 'PUT'
  });
  //console.log(responseZaBrPregleda);

  const response = await fetch(`http://localhost:5105/Oglas/VratiOglas/${params.oglasId}`);
  
  if(!response.ok) throw Error('Greska!');
  //else console.log('Ucitan oglas');
  const data = await response.json();

  return data;
}

export default function Oglas() {

  const data = useLoaderData();

  const { navbarSetCollapsable } = useContext(NavBarContext)
    React.useEffect(() => {
        
        navbarSetCollapsable(false)
        return ()=>navbarSetCollapsable(true)
    }, [])

  const [dugmePrati, setDugmePrati] = useState('Prati oglas!');
  const [slika, setSlika] = useState(0);

  let stanje;
  let prikazSlika = true;  
  
  if(data.slikeZaSlanje.length === 0){
    prikazSlika = false;
  }

  const nizSlika = prikazSlika ? 
                    data.slikeZaSlanje.sort((a, b) => {
                      if(a < b) return 1;
                      else if(a > b) return -1;
                      else return 0;
                    }).map(slika => slika.naziv)
                    :
                    [];

  if(data.stanje === 0){
    stanje = 'Novo';
  } else if(data.stanje === 1){
    stanje = 'Kao novo - nekorisceno';
  } else if(data.stanje === 2){
    stanje = 'Polovno'
  }

  function napraviDatum(datumJson) {
    const datum = new Date(datumJson);
    let dan = datum.getDate();
    let mesec = datum.getMonth() + 1;
    const godina = datum.getFullYear();

    if(dan < 10) dan = `0${dan}`;
    if(mesec < 10) mesec = `0${mesec}`;

    return `${dan}.${mesec}.${godina}.`;
  }

  function handleDugmePrati() {
    setDugmePrati(prevDugmePrati => {
      let novo;
      if(prevDugmePrati === 'Prati oglas!') {
        novo = 'Oglas pracen!';
      } else {
        novo = 'Prati oglas!';
      }
      return novo;
    })
  }

  function handleSlikaLevo() {
    setSlika(prevSlika => {
      if(prevSlika === 0) return nizSlika.length - 1;
      else return prevSlika - 1;
    })
  }
  
  function handleSlikaDesno() {
    setSlika(prevSlika => {
      if(prevSlika === nizSlika.length - 1) return 0;
      else return prevSlika + 1
    })
  }
  
  function popuniPolja(){
    let nizPolja = [];
    for (const key in data.polja) {
      nizPolja.push(<li key={key}>{key}: {data.polja[key]}</li>);
    }
    return nizPolja;
  }

  const fetchZaSlike = 'http://localhost:5105/Oglas/VratiSliku/';

  const naslovnaSlika = data.slikeZaSlanje.length === 0 ? 
                                PlaceHolder 
                                :
                                fetchZaSlike + data.slikeZaSlanje.filter(slika => slika.redosled === 0)[0].naziv;

  return (
    <>
      <div className="oglas">
        <div className="oglas-header">
          <h1>{data.ime}</h1>
          <Link to='/postavioglas'>
            <button className="btn btn-primary button-prvi-tip">Postavi oglas</button>
          </Link>
        </div>
        {/* <hr></hr> */}
        <div className="oglas-prikaz">
          
          <div className="oglas-slika-div">
            {<img src={naslovnaSlika} className="naslovna-slika-css" alt=""/>}
          </div>

          <div className="oglas-informacije">

            <div className="oglas-informacije-red oglas-informacije-cena">
              <label>Cena:</label>
              <label>{data.cena}</label>
            </div>

            <div className="oglas-informacije-red">
              <label>Kolicina:</label>
              <label>{data.kolicina}</label>
            </div>

            <div className="oglas-informacije-red">
              <label>Datum postavljanja:</label>
              <label>{napraviDatum(data.datumPostavljanja)}</label>
            </div>

            <div className="oglas-informacije-red">
              <label>Stanje:</label>
              <label>{stanje}</label>
            </div>

            <div className="oglas-informacije-red">
              <button className="btn btn-primary button-drugi-tip" onClick={handleDugmePrati}>{dugmePrati}</button>
            </div>

          </div>

          <div className="oglas-informacije">

            <div className="oglas-informacije-red-korisnik">
              <label>Korisnik:</label>
              <Link  to={`/profil/${data.vlasnikUsername}`} className="btn btn-primary button-prvi-tip">{data.vlasnikUsername}</Link>
            </div>

            <div className="oglas-informacije-red">
              <button className="btn btn-primary button-drugi-tip">Poruka</button>
            </div>
            
            <div className="oglas-informacije-red">
              <label>Lokacija:</label>
              <label>{data.lokacija}</label>
            </div>

            <div className="oglas-informacije-red">
              <label>Broj pregleda oglasa: </label>
              <label>{data.brojPregleda}</label>
            </div>

          </div>
          
        </div>

        <div className="pet-slika-i-polja">
          {prikazSlika && 
            <div className="oglas-pet-slika">

              <button onClick={handleSlikaLevo}> {'<'} </button>
              <img src={fetchZaSlike + nizSlika[slika]} className="oglas-slika" />
              <button onClick={handleSlikaDesno}> {'>'}</button>

            </div>
          }
          
          <ul className="polja">
            <h4 className="polja-naslov">Specifikacije:</h4>
            {popuniPolja()}
          </ul>

        </div>
        
        <div className="oglas-opis">
          <h4 className="oglas-opis-naslov">Opis oglasa:</h4>
          {data.opis}
        </div>

      </div>
    </>
  )
}