import './EditPage.css';
import slika from './mango.jpg';
import { userActions } from "../store/user";
import { useSelector,useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { useRef,useContext } from 'react';
import AuthContext from '../store/auth-context';
const EditPage = () =>{
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
    slika:state.user.uslika
    //<span className="text-black-50">veljkoveljovic13@gmail.com</span>
  }));
  console.log(user.slika);
  const savedUserState=localStorage.getItem('userState');
  if(savedUserState)
  {
    dispatch(userActions.setValues(JSON.parse(savedUserState)));
  }

  console.log(user.name+" "+user.surname+""+user.role);
const handlerIzmena = ()=>{
  console.log(AdresaRef.current.value);
  console.log(authCtx.token);
  let f = 1;
  console.log(ImeRef.current.value);
  console.log(ImeRef.current.value.length);
  if(ImeRef.current.value.length<3)
  {f=-1;console.log(f+"AAAAAAA")}
  if(PrezimeRef.current.value.length<3)
  {f=-1;console.log(f+"AAAAAAA")}
  if(AdresaRef.current.value.length<3)
  {f=-1;console.log(f+"AAAAAAA")}
  if(TelefonRef.current.value.length<3)
  {f=-1;console.log(f+"AAAAAAA")}
  if(f===1)
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
  
    console.log(odgovorTekst);
  }) .catch((error) => {
    console.log(error);
  });
  let obj ={
    name:ImeRef.current.value,
  surname:PrezimeRef.current.value,
  username:user.username,
  address: AdresaRef.current.value,
  email:user.email,
  phone:TelefonRef.current.value,
  uplata:user.uplata,
  role:user.role,
  slika:user.slika
  }
  let jsonStr=JSON.stringify(obj);
  localStorage.setItem("userState",jsonStr);
  dispatch(userActions.setValues(JSON.parse(jsonStr)));
}
}
const handlerSifre = () =>{
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
return(<div className="container rounded bg-white mt-5 mb-5" style={{ width: '100%', height: '100%' }}>
    <div className="row">
        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src={`data:image/jpeg;base64, ${user.slika}`}/><span className="font-weight-bold">{user.username}</span><span className="text-black-50">{user.email}</span><span> </span></div>
        </div>
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
                <div className="row mt-3">
                    <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" value=""/></div>
                    <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" value="" placeholder="state"/></div>
                </div>
                <div className="mt-5 text-center"><button className="btn btn-primary" type="button" onClick={handlerIzmena}>Save Profile</button></div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience"><Link to="/neka">Postani premium</Link><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Promeni sifru</span></div><br></br>
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