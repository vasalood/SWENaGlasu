import React from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBCardFooter
} from 'mdb-react-ui-kit';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
const UgovorPlavi =(props)=>{
  const[imeOglasa,setImeOglasa]=useState('');
  useEffect(() => {
    fetch(`http://localhost:5105/Oglas/VratiOglas/${props.oglas.oglasId}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Greška prilikom dohvatanja oglasa.");
        }
      })
      .then(data => {
        setImeOglasa(data.ime); // Pretpostavljajući da se ime oglasa nalazi u polju "ime" objekta "data"
        // Ovde možete dalje manipulisati sa imenom oglasa, postaviti ga u state ili prikazati na željeni način
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
   let obj= localStorage.getItem('userState');
    let parsed = JSON.parse(obj);
    return( <MDBCard background='' className='text-body mb-3' style={{backgroundColor:'#0d6efd', color:'white'}}>
    <MDBCardHeader style={{color:'#f8f9fa'}}>NaGlasu</MDBCardHeader>
    <MDBCardBody>
    <MDBCardTitle style={{color:'#f8f9fa'}}>{imeOglasa}</MDBCardTitle>
      <MDBCardText style={{color:'#f8f9fa'}}>
        {props.oglas.opis}
      </MDBCardText>
    </MDBCardBody>
    <Link to={`/profil/${props.oglas.kupacUsername}`}>  <MDBCardFooter style={{color:'#f8f9fa'}}>Kupac oglasa je: {props.oglas.kupacUsername} </MDBCardFooter></Link>
    <MDBCardFooter style={{color:'#f8f9fa'}}>Cena oglasa: {props.oglas.ukupna_Cena} RSD</MDBCardFooter>
  </MDBCard>)
}
export default UgovorPlavi;