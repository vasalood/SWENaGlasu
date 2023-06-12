import './EditPage.css';
import slika from './mango.jpg';
import { userActions } from "../store/user";
import { useSelector,useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useRef,useContext, useState } from 'react';
import AuthContext from '../store/auth-context';
import PopUpModal from '../LoginPage/PopUpModal';
import defaultImage from './istockphoto-1300845620-612x612.jpg';
const EditPage = () =>{
  const[errorPop,setErrorPop]=useState();

  const validatePassword = (password) => {
    // Provera da li lozinka sadrži cifru, veliko slovo i broj
    const hasDigit = password.includes("0") || password.includes("1") || password.includes("2") || password.includes("3") || password.includes("4") || password.includes("5") || password.includes("6") || password.includes("7") || password.includes("8") || password.includes("9");
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasLength =password.length>7;
          // Vraćanje rezultata validacije
    return hasDigit && hasUppercase && hasNumber && hasLength;
  };
  const authCtx = useContext(AuthContext);
 let token= localStorage.getItem('token');
 console.log(token);
  const ImeRef = useRef();
  const PrezimeRef=useRef();
  const TelefonRef=useRef();
  const AdresaRef=useRef();
  const sifraRef=useRef();
  const novaSifraRef=useRef();
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
  let savedUserState=localStorage.getItem('userState');
  //console.log(user.slika);
  console.log(savedUserState);
  if(savedUserState)
  {
    dispatch(userActions.setValues(JSON.parse(savedUserState)));
  }

  console.log(user.name+" "+user.surname+""+user.role);
const handlerIzmena = ()=>{
  let proba =-1;
  const ime = ImeRef.current.value;
  const prezime = PrezimeRef.current.value;
  const telefon = TelefonRef.current.value;
  const adresa = AdresaRef.current.value;
  const isImeValid = ime.length > 3 && !/\d/.test(ime);
  const isPrezimeValid = prezime.length > 3 && !/\d/.test(prezime);
  const isAdresaValid = adresa.length > 5 && /\d/.test(adresa);
  const isTelefonValid = /^\d+$/.test(telefon) && telefon.length>7;
  if(isImeValid && isPrezimeValid && isAdresaValid && isTelefonValid)
  {
  fetch("http://localhost:5105/Authentication/UpdateUser/"+ user.username + "/" + ImeRef.current.value + "/" + PrezimeRef.current.value + "/" + AdresaRef.current.value + "/" + TelefonRef.current.value, {
    method: "PUT", // HTTP metoda koja se koristi za zahtev
    headers: {
      "Authorization":`Bearer ${token}`,
      "Content-Type": "application/json", // Tip sadržaja koji se šalje
    },
    body: JSON.stringify({
      // Objekat koji se šalje kao sadržaj
     
    }),
  }).then(odgovorTekst=>{
    if(odgovorTekst.ok)
    {
      proba =1;
    setErrorPop({
      title:"Uspešno ste izmenili svoje podatke",
      message:""
     });
    }
    else
    {
      setErrorPop({
        title:"Došlo je do greške",
        message:""
       });
    }
    
  }) .catch((error) => {
    console.log(error);
  });
  if(proba ==1)
  {
  console.log(savedUserState);
  console.log(savedUserState.id);
    let obj ={
    name:ImeRef.current.value,
  surname:PrezimeRef.current.value,
  username:user.username,
  address: AdresaRef.current.value,
  email:user.email,
  phone:TelefonRef.current.value,
  uplata:user.uplata,
  role:user.role,
  slika:user.slika,
  id:user.id
  }
  let jsonStr=JSON.stringify(obj);
  localStorage.setItem("userState",jsonStr);
  dispatch(userActions.setValues(JSON.parse(jsonStr)));
}
}
else
{
  setErrorPop({
    title:"Greška",
    message:"Nažalost došlo je do greške. Proverite podatke opet i pokušajte ponovo."
   });
}
}
const handlerSifre = () =>{
  const newPassword = sifraRef.current.value;
  const isPasswordValid = validatePassword(newPassword);
  const newPassword2 = novaSifraRef.current.value;
  const isPasswordValid2 = validatePassword(newPassword2);
  if(isPasswordValid && isPasswordValid2 && newPassword===newPassword2)
  {
  fetch("http://localhost:5105/Authentication/IzmeniSifru/"+ user.username + "/"+sifraRef.current.value, {
    method: "PUT", // HTTP metoda koja se koristi za zahtev
    headers: {
      "Authorization":`Bearer ${token}`,
      "Content-Type": "application/json", // Tip sadržaja koji se šalje
    },
    body: JSON.stringify({
      // Objekat koji se šalje kao sadržaj
     
    }),
  }).then(odgovorTekst=>{
  
    console.log(odgovorTekst);
  }) .catch((error) => {
    console.log(error);
  });
}
else
{
  setErrorPop({
    title:"Greška",
    message:"Nažalost došlo je do greške. Proverite da li Vaša nova lozinka sadrži veliko slovo, cifru i da ima više od 7 karaktera, takođe proverite da li se lozinke poklapaju."
   });
}
}
const errorHandler = () =>{
  setErrorPop(null);
}
return(<div className="container rounded bg-white mt-5 mb-5" style={{ width: '100%', height: '100%' }}>
   {errorPop?<PopUpModal title= {errorPop.title} message={errorPop.message} onConfirm={errorHandler}></PopUpModal>:null}
    <div className="row">
        <div className="col-md-3 border-right">
        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
  {user.slika ? (
    <img className="rounded-circle mt-5" width="150px" src={`data:image/jpeg;base64, ${user.slika}`} />
  ) : (
    <img className="rounded-circle mt-5" width="150px" src={defaultImage} />
  )}
  <span className="font-weight-bold">{user.username}</span>
  <span className="text-black-50">{user.email}</span>
  <span> </span>
</div>        </div>
        <div className="col-md-5 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                <div className="col-md-6"><label className="labels">Ime</label><input type="text" className="form-control" defaultValue={user.name} ref={ImeRef}/></div>
                <div className="col-md-6"><label className="labels">Prezime</label><input type="text" className="form-control" defaultValue={user.surname} ref={PrezimeRef}/></div>
                </div> 
                <div className="row mt-3">
                <div className="col-md-12"><label className="labels">Email </label><input type="text" className="form-control" defaultValue={user.email} disabled={true}/></div>
                    <div className="col-md-12"><label className="labels">Telefon</label><input type="text" className="form-control" defaultValue={user.phone} ref={TelefonRef}/></div>
                    <div className="col-md-12"><label className="labels">Adresa</label><input type="text" className="form-control" defaultValue={user.address} ref={AdresaRef}/></div>
                </div>
               
                <div className="mt-5 text-center"><button className="btn btn-primary" type="button" onClick={handlerIzmena}>Save Profile</button></div>
            </div>
        </div>
        <div className="col-md-4">
        <div className="p-3 py-5">
  {(user.role === "User" || user.role === "PremiumUser") && (
    <div className="d-flex justify-content-between align-items-center experience">
      <Link to="/neka">Postani premium</Link>
    </div>
  )}
<br></br>
                
                <div className="col-md-12"><label className="labels">Nova Sifra</label><input type="text" className="form-control" placeholder="nova sifra"  ref={sifraRef}/></div> <br></br>
                <div className="col-md-12"><label className="labels">Potvrdi sifru</label><input type="text" className="form-control" placeholder="nova sifra" ref={novaSifraRef}/></div>
                <div className="mt-5 text-center"><button className="btn btn-primary" type="button" onClick={handlerSifre}>Izmeni Sifru</button></div>
                </div>
                </div>
                </div>
                </div>
 );
}
export default EditPage;