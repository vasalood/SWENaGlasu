import './EditPage.css';
import slika from './mango.jpg';
import { userActions } from "../store/user";
import { useSelector,useDispatch } from "react-redux";
import { localStorageAvailable } from '@mui/x-data-grid/utils/utils';
const EditPage = () =>{
    const dispatch=useDispatch();
  const user = useSelector(state =>({
    name:state.user.uname,
    surname:state.user.usurname,
    username:state.user.uusername,
    address:state.user.uaddress,
    email:state.user.uemail,
    phone:state.user.uphone,
    uplata:state.user.uuplata,
    role:state.user.urole
    //<span className="text-black-50">veljkoveljovic13@gmail.com</span>
  }));
  //console.log(user.name+" "+user.surname);
  const savedUserState=localStorage.getItem('userState');
  const handler = () =>{
    console.log("aaa");
  }
  if(savedUserState)
  {
    dispatch(userActions.setValues(JSON.parse(savedUserState)));
  }
  dispatch(userActions.getValues());
  console.log(user.name+" "+user.surname+""+user.role);
return(<div className="container rounded bg-white mt-5 mb-5" style={{ width: '100%', height: '100%' }}>
    <div className="row">
        <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src={slika}/><span className="font-weight-bold">{user.username}</span><span> </span></div>
        </div>
        <div className="col-md-5 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6"><label className="labels">Ime</label><input type="text" className="form-control" defaultValue={user.name} /></div>
                    <div className="col-md-6"><label className="labels">Prezime</label><input type="text" className="form-control" defaultValue={user.surname}/></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels">Broj telefona</label><input type="text" className="form-control" placeholder="enter phone number"defaultValue={user.phone} readOnly={false}/></div>
                    <div className="col-md-12"><label className="labels">Adresa stanovanja</label><input type="text" className="form-control" defaultValue={user.address} /></div>
                    <div className="col-md-12"><label className="labels">Address Line 2</label><input type="text" className="form-control" placeholder={user.role} /></div>
                    <div className="col-md-12"><label className="labels">Email</label><input type="text" className="form-control" defaultValue={user.email} /></div>
                    {/* <div className="col-md-12"><label className="labels">Postcode</label><input type="text" className="form-control" placeholder="enter address line 2" /></div>
                    <div className="col-md-12"><label className="labels">State</label><input type="text" className="form-control" placeholder="enter address line 2" /></div>
                    <div className="col-md-12"><label className="labels">Area</label><input type="text" className="form-control" placeholder="enter address line 2" /></div>
                    <div className="col-md-12"><label className="labels">Education</label><input type="text" className="form-control" placeholder="education" /></div> */}
                </div>
                <div className="row mt-3">
                    <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" /></div>
                    <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control"  placeholder="state"/></div>
                </div>
                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onClick={handler}>Save Profile</button></div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus"></i>&nbsp;Experience</span></div><br></br>
                <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" /></div> <br></br>
                <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" /></div>
                </div>
                </div>
                </div>
                </div>
 );
}
export default EditPage;