import MenuItemm from "./MenuItemm";
import './Oglasi.css';
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import ExpensesFilter from "./ExpensesFilter";
import KarticaOglasNova from "./KarticaOglasNova";
import './KarticaOglasNova.css';
const Favoriti = (props) =>{
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
  slika:state.user.uslika,
  id:state.user.uid
  //<span className="text-black-50">veljkoveljovic13@gmail.com</span>
}));
let parsedData = localStorage.getItem('userState');
let obj =JSON.parse(parsedData);
useEffect(() => {
  console.log(obj);
  console.log(obj.id);
  console.log(obj.username);
    fetchFavorites(obj.id, 0, 10, 'popularnost', '0');
    console.log(oglasList);
  }, []);
  const fetchFavorites = (userId, M, N, orderBy, orderType) => {
    console.log(userId);
    const url = `http://localhost:5105/Oglas/VratiFavorite/${userId}?M=${M}&N=${N}&orderBy=${orderBy}&orderType=${orderType}`;
    
    fetch(url)
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
  };


    return (

      <>
      <div >
   <h1 style={{ marginBottom: '1rem', fontSize: '3rem', fontWeight: '800', color: '#333333', lineHeight: '1' }}>
  <span style={{ background: 'linear-gradient(to right, #3B82F6, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Oglasi koje</span> Pratite.
</h1>
<p style={{ fontSize: '1.5rem', fontWeight: 'normal', color: '#888888', lineHeight: '1.2' }}>
 Sajt NaGlasu Vam omogućava da sve oglase koji su Vama interesantni zapratite 
</p>
<div className="container grid grid--3-cols margin-right-md">
          {oglasList.map((oglas) => (
            <KarticaOglasNova key={oglas.id} oglas={oglas} slika={oglas.slikeZaSlanje[0].naziv}  />
          ))}
          </div>
       </div>
        </>
      );
    };

export default Favoriti;