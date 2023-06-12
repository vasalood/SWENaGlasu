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
const UgovorBeli =(props)=>{
  const[imeOglasa,setImeOglasa]=useState('');
  useEffect(() => {
    console.log("stampamo ovo");
    console.log(props.oglas.id);
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
  console.log(props.oglas);
    return( <MDBCard background='' className='mb-3' style={{backgroundColor:'#FFFFFF'}}>
    <MDBCardHeader >NaGlasu</MDBCardHeader>
    <MDBCardBody >
      <MDBCardTitle >{imeOglasa}</MDBCardTitle>
      <MDBCardText >
        {props.oglas.opis}
      </MDBCardText>
    </MDBCardBody>
    <MDBCardFooter >Prodavac oglasa je: {props.oglas.prodavacUsername}</MDBCardFooter>
    <MDBCardFooter >Cena oglasa: {props.oglas.ukupna_Cena} RSD</MDBCardFooter>
  </MDBCard>)
}
export default UgovorBeli;