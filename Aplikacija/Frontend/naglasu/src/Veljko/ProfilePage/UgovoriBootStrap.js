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
export default function App() {
  let obj= localStorage.getItem('userState');
  let parsed = JSON.parse(obj);
  const [nizUgovora1,setNizUgovora1]=useState([]);
  const [nizUgovora2,setNizUgovora2]=useState([]);
  useEffect(() => {
    fetchFavorites(parsed.id, 0, 10,true,true, 'cena', '0');
    fetchFavorites2(parsed.id, 0, 10,false,true, 'cena', '0');
    console.log(nizUgovora1);
  }, []);
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
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
       
        {nizUgovora1.length > 0 ? (
  nizUgovora1.map((oglas) => (
    <UgovorBeli key={oglas.id} oglas={oglas} />
  ))
) : (
  <p>Loading...</p>
)}
      {nizUgovora2.length > 0 ? (
  nizUgovora2.map((oglas) => (
    <UgovorPlavi key={oglas.id} oglas={oglas} />
  ))
) : (
  <p>Loading...</p>
)}

    </div>
  );
}