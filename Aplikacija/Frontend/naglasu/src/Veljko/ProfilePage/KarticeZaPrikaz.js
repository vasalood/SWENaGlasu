import KarticaOglasNova from "./KarticaOglasNova";
import { useEffect, useState } from "react";
import './KarticaOglasNova.css';
import { useSelector,useDispatch } from "react-redux";
import PlaceHolder from "../../Uros/Res/Slike/placeholder.jpg";
const KarticeZaPrikaz = ({oglasList}) =>{
    //const [oglasList,setOglasList]= useState([]);
    console.log(oglasList);
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
let data=localStorage.getItem('userState');
  let parsedData = JSON.parse(data);
  let id = parsedData.id;
  console.log(parsedData.username);
  console.log("hhhasdafshhjafaaAAAA");
/* useEffect(()=>{
   
    fetch("http://localhost:5105/Oglas/VratiMTihNOglasa/10/0/datum/1",
        {
            method: "POST",
            headers:
            {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(
                {
                    username:parsedData.username
                }
            )
        })
    .then(odgovor => odgovor.json())
      .then(odgovorTekst =>  {
            //console.log(odgovorTekst.lista.slikeZaSlanje[0].naziv);
            odgovorTekst.lista.forEach(element => {
              //console.log(element.slikeZaSlanje);
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
  ,[]) */
  // background-color: #FFFFFF;

  return (

    <>
    <div className="container grid grid--3-cols margin-right-md oglasiKartica" >
        {oglasList.map((oglas) => (
          <KarticaOglasNova  key={oglas.id} oglas={oglas} slika={oglas.slikeZaSlanje} />
        ))}
        </div>
      </>
    );
}
export default KarticeZaPrikaz;