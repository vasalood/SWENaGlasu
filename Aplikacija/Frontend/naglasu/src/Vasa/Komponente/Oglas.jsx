import React from "react";
import { useState, useContext } from "react";
import { useLoaderData } from "react-router";
import { Link } from 'react-router-dom';
import './Oglas.css';
import PlaceHolder from "../../Uros/Res/Slike/placeholder.jpg";
import NavBarContext from "../../Uros/Contexts/NavBarContext";
import { Escalator } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import PopUpModal from '../../Veljko/LoginPage/PopUpModal';
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
  const[NudimTrazim,setNudimTrazim]=useState('');
  const[errorPop,setErrorPop]=useState();
  const navigate =useNavigate();
  let token = localStorage.getItem('token');
  const [id,setId]=useState(()=>{
    let data2=localStorage.getItem('userState');
    if(data2)
    {
  let parsedData = JSON.parse(data2);
 return parsedData.id;
    }
    else
    {
      return null;
    }
  });
 
  const data = useLoaderData();

  const { navbarSetCollapsable } = useContext(NavBarContext)
    React.useEffect(() => {
        if(data.smer===0)
        {
          setNudimTrazim('Nudim:')
        }
        else if(data.smer===0)
        {
          setNudimTrazim('Tražim:')
        }
        navbarSetCollapsable(false)
        return ()=>navbarSetCollapsable(true)
    }, [])
    const[idFavorita,setIdFavorita]=useState(0);
    const [dugmePrati, setDugmePrati] = useState(() => {
      if(id)
      {
      const fetchData = async () => {
        try {
          const headers = {
            'Authorization': 'Bearer ' + token 
          };
          
          const response = await fetch(`http://localhost:5105/Oglas/JelFavorit?oglasId=${data.id}&id=${id}`, {
            headers: headers
          });
          if (response.ok) {
            const data = await response.json();
            //console.log(data);
            if (data) {
              setIdFavorita(data);
              console.log(data);
              setDugmePrati('Oglas praćen');
            } else {
              setDugmePrati('Prati oglas');
            }
          } else {
            throw new Error("Greška prilikom dohvatanja favorita.");
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }
    else
    {
      return 'Prati oglas';
    }
    });
  const [slika, setSlika] = useState(0);
  const[prikazDugme,setPrikazDugme]=useState(()=>{
    //console.log(data);
    //console.log(id);
    if(id===data.vlasnikId)
      return false;
      else
      return true;
  });
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
    stanje = 'Novo - neotpakovano';
  } else if(data.stanje === 1){
    stanje = 'Kao novo - nekorišćeno';
  } else if(data.stanje === 2){
    stanje = 'Polovno - očuvano'
  }
  else if (data.stanje ===3)
  {
    stanje='Polovno'
  }
  else if(data.stanje ===4)
  {
   stanje ='Polovno - neupotrebivo'
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
    if(id===null)
    {
      setErrorPop({
        title:"Niste prijavljeni !"
      })
      return;
    }
    setDugmePrati(prevDugmePrati => {
      let novo;
      if(prevDugmePrati === 'Prati oglas') {
        novo = 'Oglas praćen';
        fetch("http://localhost:5105/Oglas/DodajFavorita", {
          method: "POST", // HTTP metoda koja se koristi za zahtev
          headers: {
            "Authorization":`Bearer ${token}`,
            "Content-Type": "application/json" // Tip sadržaja koji se šalje
          },
          body: JSON.stringify({
            korisnikId:id,
            oglasId:data.id
          })
      }).then(response=>{
        if(response.ok)
        {
         console.log("Uspesno zapraceno");
        }
        else
        {
         console.log("Nije uspesno zapraceno");
        }
      })
    }
      else {
        novo = 'Prati oglas';
        fetch(`http://localhost:5105/Oglas/SkiniFavorita?Id=${idFavorita}`, {
          method: "DELETE", // HTTP metoda koja se koristi za zahtev
          headers: {
            "Authorization":`Bearer ${token}`
            
          }
        })
        
        
      }
      return novo;
    })
  
  }
  const handleKorisnikPrikaz = ()=>{
    if(id==null)
    {
      setErrorPop({
        title:"Niste prijavljeni !"
      })
    }
    else
    {
      navigate(`/profil/${data.vlasnikUsername}`);
    }
  }
  const handleKorisnikPoruka = () =>{
    if(id ==null)
    {
      setErrorPop({
        title:"Niste prijavljeni !"
      })
    }
    else
    {
      navigate(`/chat/0/${data.id}/${id}`)
    }
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
  const  handleDugmeObrisi = () =>{
    if(id===null)
    {
      setErrorPop({
        title:"Niste prijavljeni !"
      })
      return;
    }
    fetch(`http://localhost:5105/Oglas/ObrisiOglas/${data.id}`, {
      method: 'DELETE', // HTTP metoda koja se koristi za zahtev
      headers: {
        "Authorization":`Bearer ${token}`
         // Tip sadržaja koji se šalje
      }
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Greška prilikom brisanja oglasa.");
        }
      })
      .then(data => {
        //console.log(data); // Ovde možete manipulisati sa porukom koja je vraćena
      })
      .catch(error => {
        console.error(error); // Ovde možete obraditi grešku koja se desila
      });
      navigate('/');
  }
  function popuniPolja(){
    let nizPolja = [];
    for (const key in data.polja) {
      nizPolja.push(<li key={key}>{key}: {data.polja[key]}</li>);
    }
    return nizPolja;
  }
    //console.log(data.polja);
    //console.log(data.slikeZaSlanje);
  const fetchZaSlike = 'http://localhost:5105/Oglas/VratiSliku/';

  const naslovnaSlika = data.slikeZaSlanje.length === 0 ? 
                                PlaceHolder 
                                :
                                fetchZaSlike + data.slikeZaSlanje.filter(slika => slika.redosled === 0)[0].naziv;

                                const errorHandler = () =>{
                                  setErrorPop(null);
  }
  const handleKorisnikAzurirajOglas = ()=>{
    navigate(`/azurirajoglas/${data.id}`);
  }
  return (
    <>
      <div className="oglas">
      {errorPop?<PopUpModal title= {errorPop.title} message={errorPop.message} onConfirm={errorHandler}></PopUpModal>:null}
        <div className="oglas-header">
          <h1>{data.ime}</h1>
          {id && <Link to='/postavioglas'>
            <button className="btn btn-primary button-prvi-tip">Postavi oglas</button>
          </Link>}
        </div>
        {/* <hr></hr> */}
        <div className="oglas-prikaz">
          
          <div className="oglas-slika-div">
            {<img src={naslovnaSlika} className="naslovna-slika-css" alt=""/>}
          </div>

          <div className="oglas-informacije">

            <div className="oglas-informacije-red oglas-informacije-cena">
              <label>Cena:</label>
              <label>{data.cena}</label> RSD
            </div>

            <div className="oglas-informacije-red">
              <label>Količina:</label>
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

           { prikazDugme&&<div className="oglas-informacije-red">
              <button className="btn btn-primary button-drugi-tip" onClick={handleDugmePrati}>{dugmePrati}</button>
            </div>}

            { !prikazDugme&&<div className="oglas-informacije-red">
              <button className="btn btn-primary button-drugi-tip" onClick={handleDugmeObrisi}>Obriši oglas</button>
            </div>}

          </div>

          <div className="oglas-informacije">
            
            <div className="oglas-informacije-red-korisnik">
              <label>Korisnik:</label>
               <button onClick={handleKorisnikPrikaz} className="btn btn-primary button-prvi-tip">{data.vlasnikUsername}</button>
            </div>

           { prikazDugme &&<div className="oglas-informacije-red">
              <button onClick={handleKorisnikPoruka} className="btn btn-primary button-drugi-tip">Poruka</button>
            </div>}
            { !prikazDugme &&<div className="oglas-informacije-red">
              <button onClick={handleKorisnikAzurirajOglas} className="btn btn-primary button-drugi-tip">Azuriraj oglas</button>
            </div>}
            
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

       {(data.slikeZaSlanje.length!==0 || Object.keys(data.polja).length !== 0) && <div className="pet-slika-i-polja">
          {prikazSlika && 
            <div className="oglas-pet-slika">

              <button onClick={handleSlikaLevo}> {'<'} </button>
              <img src={fetchZaSlike + nizSlika[slika]} className="oglas-slika" />
              <button onClick={handleSlikaDesno}> {'>'}</button>

            </div>
          }
          
          {Object.keys(data.polja).length !== 0 &&<ul className="polja">
            <h4 className="polja-naslov">Specifikacije:</h4>
            {popuniPolja()}
          </ul>}

        </div>}
        
        <div className="oglas-opis">
          <h4 className="oglas-opis-naslov">{NudimTrazim}</h4>
          <h5 className="oglas-opis-naslov">Opis oglasa</h5>
          {data.opis}
        </div>

      </div>
    </>
  )
}