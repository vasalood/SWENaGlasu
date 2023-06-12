import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBCardFooter
} from 'mdb-react-ui-kit';
import ExpenseDate from './ExpenseDate';
import { useEffect } from 'react';
import UgovorBeli from './UgovorBeli';
import UgovorPlavi from './UgovorPlavi';
import './ExpensesFilter.css'
export default function App() {
  const handleChangeUgovori = (event) =>{
    
    setUgovor(event.target.value);
  }
  let obj= localStorage.getItem('userState');
  let parsed = JSON.parse(obj);
  const [nizUgovora1,setNizUgovora1]=useState([]);
  const [nizUgovora2,setNizUgovora2]=useState([]);
  const [ugovor,setUgovor]=useState("Svi Ugovori");
  useEffect(() => {
    if(ugovor ==='Svi Ugovori')
    {
      console.log("OBA SAM FETCHOVO");
    fetchFavorites(parsed.id, 0, 10,true,true, 'cena', '0');
    fetchFavorites2(parsed.id, 0, 10,false,true, 'cena', '0');
    }
    else if(ugovor === 'Kupac')
    {
      console.log("KUPCA SAM FETCHOVO");
      fetchFavorites(parsed.id, 0, 10,true,true, 'cena', '0');
      setNizUgovora2([]);
    }
    else
    {
      console.log("PRODAVCA SAM FETCHOVO");
      fetchFavorites2(parsed.id, 0, 10,false,true, 'cena', '0');
      setNizUgovora1([]);
    }
 
  }, [ugovor]);
  const fetchFavorites2 = (korisnikId, M, N,zaKupca,prihvaceni, orderBy, orderType) => {
    console.log(korisnikId);
    const url = `http://localhost:5105/Ugovor/VratiMtihNUgovora/${korisnikId}?M=${M}&N=${N}&zaKupca=${zaKupca}&prihvaceni=${prihvaceni}&orderBy=${orderBy}&orderType=${orderType}`;
    
    fetch(url)
    .then(odgovor => odgovor.json())
    .then(odgovorTekst =>  {
          console.log(odgovorTekst);
          setNizUgovora2(odgovorTekst.lista);
          })
          .catch((error) => {
            console.log(error);
          });
  };
  const fetchFavorites = (korisnikId, M, N,zaKupca,prihvaceni, orderBy, orderType) => {
    console.log(korisnikId);
    const url = `http://localhost:5105/Ugovor/VratiMtihNUgovora/${korisnikId}?M=${M}&N=${N}&zaKupca=${zaKupca}&prihvaceni=${prihvaceni}&orderBy=${orderBy}&orderType=${orderType}`;
    
    fetch(url)
    .then(odgovor => odgovor.json())
    .then(odgovorTekst =>  {
          console.log(odgovorTekst);
          setNizUgovora1(odgovorTekst.lista);
          })
          .catch((error) => {
            console.log(error);
          });
          

  };
  console.log("stampamo ugovori 1");
  console.log(nizUgovora1);
  console.log("stampamo ugovori 2");
          console.log(nizUgovora2);
  return (
    <>
     <h1 style={{ marginBottom: '1rem', fontSize: '3rem', fontWeight: '800', color: '#333333', lineHeight: '1' }}>
  <span style={{ background: 'linear-gradient(to right, #3B82F6, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Sklopljeni</span> ugovori
</h1>
<p style={{ fontSize: '1.5rem', fontWeight: 'normal', color: '#888888', lineHeight: '1.2' }}>
Putem sajta NaGlasu imate mogućnost da se dogovarate i sklapate ugovore kako za oglase koje ste postavili, tako i za oglase za koje ste zainteresovani.
</p>
    <div className='expenses-filter'>
            <div className='expenses-filter__container'>
          <div className='expenses-filter__control'>
            <label style={{color:"gray"}}></label>
            
           {/* < select value={props.selectedMonth} onChange={dropdownChangeHandler}> */}
           <select value ={ugovor} onChange={handleChangeUgovori} >
           <option value='Svi Ugovori'>Svi Ugovori</option>
           <option value='Kupac'>Kupac</option>
              <option value='Prodavac'>Prodavac</option>
            </select>
            </div>
            
          </div>
        </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
       
        {nizUgovora1.length > 0 ? (
  nizUgovora1.map((oglas) => (
    <UgovorBeli key={oglas.id} oglas={oglas} />
  ))
) : (
  <></>
)}
      {nizUgovora2.length > 0 ? (
  nizUgovora2.map((oglas) => (
    <UgovorPlavi key={oglas.id} oglas={oglas} />
  ))
) : (
  <></>
)
}

    </div>
    </>  );
}