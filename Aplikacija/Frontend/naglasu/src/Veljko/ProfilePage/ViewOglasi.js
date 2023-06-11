import MenuItemm from "./MenuItemm";
import './Oglasi.css';
import { useContext, useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import ExpensesFilter from "./ExpensesFilter";
import AuthContext from "../store/auth-context";
import KarticaOglasNova from "./KarticaOglasNova";
const ViewOglasi = (props) =>{
const [oglasList,setOglasList]= useState([]);
const authCtx = useContext(AuthContext);
let a =props.username
useEffect(()=>{
   
    fetch("http://localhost:5105/Oglas/VratiMTihNOglasa/10/0/popularnost/0",
        {
            method: "POST",
            headers:
            {
              // "Authorization":`Bearer ${authCtx.token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(
                {
                    username:a
                }
            )
        })
    .then(odgovor => odgovor.json())
      .then(odgovorTekst =>  {
            //console.log(odgovorTekst.lista.slikeZaSlanje[0].naziv);
            odgovorTekst.lista.forEach(element => {
                //console.log(element.slikeZaSlanje[0].naziv);
            });
           // console.log(odgovorTekst.lista[0].slikeZaSlanje[0].naziv);
           setOglasList(odgovorTekst.lista);
           console.log(oglasList);
       } )
            .catch((error) => {
              console.log(error);
            });
        }
  ,[props.username])
  return (

    <>
          {oglasList.length === 0 ? null : (
  <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, color: '#333333',marginTop:'4rem'}}>
    Oglasi koje je <mark style={{ paddingRight:'0.3rem', color: '#ffffff', backgroundColor: '#3B82F6', borderRadius: '0.25rem', paddingTop:'0.3rem' }}>{props.username}</mark> postavio
  </h1>
)}
    <div className="container grid grid--3-cols margin-right-md oglasiKartica" >
        {oglasList.map((oglas) => (
          <KarticaOglasNova key={oglas.id} oglas={oglas} slika={oglas.slikeZaSlanje} />
        ))}
        </div>
      </>
  );

};
export default ViewOglasi;