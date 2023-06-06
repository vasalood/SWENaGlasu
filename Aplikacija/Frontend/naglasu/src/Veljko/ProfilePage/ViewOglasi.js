import MenuItemm from "./MenuItemm";
import './Oglasi.css';
import { useContext, useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import ExpensesFilter from "./ExpensesFilter";
import AuthContext from "../store/auth-context";
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
                console.log(element.slikeZaSlanje[0].naziv);
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

    <div className="oglas-container">
      {oglasList.map((oglas) => (
        <MenuItemm key={oglas.id} oglas={oglas} slika={oglas.slikeZaSlanje[0].naziv} />
      ))}
    </div>
  );

};
export default ViewOglasi;