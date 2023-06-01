import MenuItemm from "./MenuItemm";
import './Oglasi.css';
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
const Oglasi = (props) =>{
const [oglasList,setOglasList]= useState([]);
const dispatch=useDispatch();
const user = useSelector(state =>({
  name:state.user.uname,
  surname:state.user.usurname,
  username:state.user.uusername,
  address:state.user.uaddress,
  email:state.user.uemail,
  phone:state.user.uphone,
  uplata:state.user.uuplata,
  role:state.user.urole,
  slika:state.user.uslika
  //<span className="text-black-50">veljkoveljovic13@gmail.com</span>
}));

useEffect(()=>{
   
    fetch("http://localhost:5105/Oglas/VratiMTihNOglasa/10/0/popularnost/0",
        {
            method: "POST",
            headers:
            {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(
                {
                    username:user.username
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
  ,[])
    // const oglasList=[
    //     {
    //         id:1,
    //         naslov:"Prvi oglas",
    //         opis:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!"
    //     },,
    //     {
    //         id:2,
    //         naslov:"Drugi oglas",
    //         opis:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!"
    //     },
    //     {
    //         id:3,
    //         naslov:"Drugi oglas",
    //         opis:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!"
    //     },
    //     {
    //         id:4,
    //         naslov:"Drugi oglas",
    //         opis:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!"
    //     },
    //     {
    //         id:5,
    //         naslov:"Drugi oglas",
    //         opis:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!"
    //     },
    //     {
    //         id:5,
    //         naslov:"Drugi oglas",
    //         opis:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!"
    //     },
    //     {
    //         id:5,
    //         naslov:"Drugi oglas",
    //         opis:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!"
    //     }
    // ];

    return (
        <div className="oglas-container">
          {oglasList.map((oglas) => (
            <MenuItemm key={oglas.id} oglas={oglas} slika={oglas.slikeZaSlanje[0].naziv} />
          ))}
        </div>
      );
    };

export default Oglasi;