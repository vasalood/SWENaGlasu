import React from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBCardFooter
} from 'mdb-react-ui-kit';
const UgovorPlavi =(props)=>{
   let obj= localStorage.getItem('userState');
    let parsed = JSON.parse(obj);
    return( <MDBCard background='info' className='text-body mb-3'>
    <MDBCardHeader>NaGlasu</MDBCardHeader>
    <MDBCardBody>
    <MDBCardTitle>{props.oglas.oglasIme}Bicikla BMX TREBA NASLOV</MDBCardTitle>
      <MDBCardText>
        {props.oglas.opis}
      </MDBCardText>
    </MDBCardBody>
    <MDBCardFooter>Prodavac oglasa je: {props.oglas.kupacUsername}</MDBCardFooter>
    <MDBCardFooter>Cena oglasa: {props.oglas.ukupna_Cena} RSD</MDBCardFooter>
  </MDBCard>)
}
export default UgovorPlavi;