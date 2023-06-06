import QuoteItem from './QuoteItem';
import mango from './mango.jpg';
// const ViewUser = () =>{
//     return(
//         <section style={{ backgroundColor: "#eee" }}>
//         <div className="container py-5">
         
//           <div className="row">
//             <div className="col-lg-4">
//               <div className="card mb-4">
//                 <div className="card-body text-center">
//                   <img
//                     src={`data:image/jpeg;base64, ${user.slika}`}
//                     alt="avatar"
//                     className="rounded-circle img-fluid"
//                     style={{ width: 150 }}
//                   />
//                   <h5 className="my-3">{user.username}</h5>
//                   <p className="text-muted mb-1">NaGlasu</p>
//                   <p className="text-muted mb-4">{user.address}</p>
//                   <div className="d-flex justify-content-center mb-2">
//                     <button type="button" className="btn btn-primary">
//                       Update
//                     </button>
//                     <button type="button" className="btn btn-outline-primary ms-1">
//                       Inbox
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="card mb-4 mb-lg-0">
//                 <div className="card-body p-0">
//                   <ul className="list-group list-group-flush rounded-3">
//                     <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                       <i className="fas fa-globe fa-lg text-warning" />
//                       <p className="mb-0">https://mdbootstrap.com</p>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                       <i
//                         className="fab fa-github fa-lg"
//                         style={{ color: "#333333" }}
//                       />
//                       <p className="mb-0">mdbootstrap</p>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                       <i
//                         className="fab fa-twitter fa-lg"
//                         style={{ color: "#55acee" }}
//                       />
//                       <p className="mb-0">@mdbootstrap</p>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                       <i
//                         className="fab fa-instagram fa-lg"
//                         style={{ color: "#ac2bac" }}
//                       />
//                       <p className="mb-0">mdbootstrap</p>
//                     </li>
//                     <li className="list-group-item d-flex justify-content-between align-items-center p-3">
//                       <i
//                         className="fab fa-facebook-f fa-lg"
//                         style={{ color: "#3b5998" }}
//                       />
//                       <p className="mb-0">mdbootstrap</p>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-8">
//               <div className="card mb-4">
//                 <div className="card-body">
//                   <div className="row">
//                     <div className="col-sm-3">
//                       <p className="mb-0">Full Name</p>
//                     </div>
//                     <div className="col-sm-9">
//                       <p className="text-muted mb-0">{user.name}</p>
//                     </div>
//                   </div>
//                   <hr />
//                   <div className="row">
//                     <div className="col-sm-3">
//                       <p className="mb-0">Prezime</p>
//                     </div>
//                     <div className="col-sm-9">
//                       <p className="text-muted mb-0">{user.surname}</p>
//                     </div>
//                   </div>
//                   <hr />
//                   <div className="row">
//                     <div className="col-sm-3">
//                       <p className="mb-0">Email</p>
//                     </div>
//                     <div className="col-sm-9">
//                       <p className="text-muted mb-0">{user.email}</p>
//                     </div>
//                   </div>
//                   <hr />
//                   <div className="row">
//                     <div className="col-sm-3">
//                       <p className="mb-0">Mobile</p>
//                     </div>
//                     <div className="col-sm-9">
//                       <p className="text-muted mb-0">{user.phone}</p>
//                     </div>
//                   </div>
//                   <hr />
//                   <div className="row">
//                     <div className="col-sm-3">
//                       <p className="mb-0">Address</p>
//                     </div>
//                     <div className="col-sm-9">
//                       <p className="text-muted mb-0">{user.address}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-6">
//                   <div className="card mb-4 mb-md-0">
//                     <div className="card-body">
//                       <p className="mb-4">
//                         <span className="text-primary font-italic me-1">
//                           assigment
//                         </span>{" "}
//                         Project Status
//                       </p>
//                       <p className="mb-1" style={{ fontSize: ".77rem" }}>
//                         Web Design
//                       </p>
//                       <div className="progress rounded" style={{ height: 5 }}>
//                         <div
//                           className="progress-bar"
//                           role="progressbar"
//                           style={{ width: "80%" }}
//                           aria-valuenow={80}
//                           aria-valuemin={0}
//                           aria-valuemax={100}
//                         />
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
//                         Website Markup
//                       </p>
//                       <div className="progress rounded" style={{ height: 5 }}>
//                         <div
//                           className="progress-bar"
//                           role="progressbar"
//                           style={{ width: "72%" }}
//                           aria-valuenow={72}
//                           aria-valuemin={0}
//                           aria-valuemax={100}
//                         />
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
//                         One Page
//                       </p>
//                       <div className="progress rounded" style={{ height: 5 }}>
//                         <div
//                           className="progress-bar"
//                           role="progressbar"
//                           style={{ width: "89%" }}
//                           aria-valuenow={89}
//                           aria-valuemin={0}
//                           aria-valuemax={100}
//                         />
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
//                         Mobile Template
//                       </p>
//                       <div className="progress rounded" style={{ height: 5 }}>
//                         <div
//                           className="progress-bar"
//                           role="progressbar"
//                           style={{ width: "55%" }}
//                           aria-valuenow={55}
//                           aria-valuemin={0}
//                           aria-valuemax={100}
//                         />
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
//                         Backend API
//                       </p>
//                       <div className="progress rounded mb-2" style={{ height: 5 }}>
//                         <div
//                           className="progress-bar"
//                           role="progressbar"
//                           style={{ width: "66%" }}
//                           aria-valuenow={66}
//                           aria-valuemin={0}
//                           aria-valuemax={100}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div className="card mb-4 mb-md-0">
//                     <div className="card-body">
//                       <p className="mb-4">
//                         <span className="text-primary font-italic me-1">
//                           assigment
//                         </span>{" "}
//                         Project Status
//                       </p>
//                       <p className="mb-1" style={{ fontSize: ".77rem" }}>
//                         Web Design
//                       </p>
//                       <div className="progress rounded" style={{ height: 5 }}>
//                         <div
//                           className="progress-bar"
//                           role="progressbar"
//                           style={{ width: "80%" }}
//                           aria-valuenow={80}
//                           aria-valuemin={0}
//                           aria-valuemax={100}
//                         />
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
//                         Website Markup
//                       </p>
//                       <div className="progress rounded" style={{ height: 5 }}>
//                         <div
//                           className="progress-bar"
//                           role="progressbar"
//                           style={{ width: "72%" }}
//                           aria-valuenow={72}
//                           aria-valuemin={0}
//                           aria-valuemax={100}
//                         />
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
//                         One Page
//                       </p>
//                       <div className="progress rounded" style={{ height: 5 }}>
//                         <div
//                           className="progress-bar"
//                           role="progressbar"
//                           style={{ width: "89%" }}
//                           aria-valuenow={89}
//                           aria-valuemin={0}
//                           aria-valuemax={100}
//                         />
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
//                         Mobile Template
//                       </p>
//                       <div className="progress rounded" style={{ height: 5 }}>
//                         <div
//                           className="progress-bar"
//                           role="progressbar"
//                           style={{ width: "55%" }}
//                           aria-valuenow={55}
//                           aria-valuemin={0}
//                           aria-valuemax={100}
//                         />
//                       </div>
//                       <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
//                         Backend API
//                       </p>
//                       <div className="progress rounded mb-2" style={{ height: 5 }}>
//                         <div
//                           className="progress-bar"
//                           role="progressbar"
//                           style={{ width: "66%" }}
//                           aria-valuenow={66}
//                           aria-valuemin={0}
//                           aria-valuemax={100}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//     </section>
//         )
// }
// export default ViewUser;
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import ViewOglasi from './ViewOglasi';
import AuthContext from '../store/auth-context';
const userStorage = [
    { username: 'Jovan Memedovic', name: 'Ime 1', email: 'ime1@example.com', slika:"https://th.bing.com/th/id/R.cd6591d36cec89977d93223cf75c936b?rik=17rUfAXhWxU3bw&pid=ImgRaw&r=0",address:"Ratka Pavlovica", surname:"AA",phone:"0643249836" },
    { username: 'korisnik2', name: 'Ime 2', email: 'ime2@example.com' },
    // ...
  ];
const ViewUser = ()=>{
  const authCtx=useContext(AuthContext);
    const { username } = useParams();
    let token = localStorage.getItem('token');
    const[user,setUser]=useState({ime:"",
    prezime:"",
    email:"",
    username:"",
    adresa:"",
    telefon:"",
    slika:""});
    useEffect(() => {
      console.log(token);
      fetch("http://localhost:5105/Authentication/GetUserView/" + username, {
        method: "GET",
        headers: {
          "Authorization":`Bearer ${token}`,
          "Content-Type": "application/json", // Tip sadržaja koji se šalje
          // Dodajte dodatne zaglavlja prema potrebi
        }
      })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else if (response.status === 400) {
              console.log(response);
            } else {
              throw new Error("Neuspešan zahtev");
            }
          })
          .then((odgovorTekst) => {
            console.log(odgovorTekst);
            // user.ime=odgovorTekst.ime;
            // user.prezime=odgovorTekst.prezime;
            // user.email=odgovorTekst.email;
            // user.telefon=odgovorTekst.telefon;
            // user.username=odgovorTekst.userName;
            // user.slika=odgovorTekst.slika
            // console.log(odgovorTekst.slika);
            setUser({
                ime:odgovorTekst.ime,
            prezime:odgovorTekst.prezime,
            email:odgovorTekst.email,
            telefon:odgovorTekst.telefon,
            username:odgovorTekst.userName,
            slika:odgovorTekst.slika,
            adresa:odgovorTekst.adresa
            })
            console.log(user);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
   
    
  
    if (!user) {
      return <div>Korisnik nije pronađen.</div>;
    }
  
        return(
        <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
         
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                     src={`data:image/jpeg;base64, ${user.slika}`}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: 150 }}
                  />
                  <h5 className="my-3">{user.username}</h5>
                  <p className="text-muted mb-1">NaGlasu</p>
                  <p className="text-muted mb-4">{user.address}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <button type="button" className="btn btn-primary">
                      Update
                    </button>
                    <button type="button" className="btn btn-outline-primary ms-1">
                      Inbox
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fas fa-globe fa-lg text-warning" />
                      <p className="mb-0">https://mdbootstrap.com</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-github fa-lg"
                        style={{ color: "#333333" }}
                      />
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-twitter fa-lg"
                        style={{ color: "#55acee" }}
                      />
                      <p className="mb-0">@mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-instagram fa-lg"
                        style={{ color: "#ac2bac" }}
                      />
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i
                        className="fab fa-facebook-f fa-lg"
                        style={{ color: "#3b5998" }}
                      />
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.ime}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Prezime</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.prezime}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Mobile</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.telefon}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">{user.adresa}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4">
                        <span className="text-primary font-italic me-1">
                          assigment
                        </span>{" "}
                        Project Status
                      </p>
                      <p className="mb-1" style={{ fontSize: ".77rem" }}>
                        Web Design
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow={80}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Website Markup
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "72%" }}
                          aria-valuenow={72}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        One Page
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow={89}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Mobile Template
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "55%" }}
                          aria-valuenow={55}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Backend API
                      </p>
                      <div className="progress rounded mb-2" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "66%" }}
                          aria-valuenow={66}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-body">
                      <p className="mb-4">
                        <span className="text-primary font-italic me-1">
                          assigment
                        </span>{" "}
                        Project Status
                      </p>
                      <p className="mb-1" style={{ fontSize: ".77rem" }}>
                        Web Design
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow={80}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Website Markup
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "72%" }}
                          aria-valuenow={72}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        One Page
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "89%" }}
                          aria-valuenow={89}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Mobile Template
                      </p>
                      <div className="progress rounded" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "55%" }}
                          aria-valuenow={55}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                      <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                        Backend API
                      </p>
                      <div className="progress rounded mb-2" style={{ height: 5 }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "66%" }}
                          aria-valuenow={66}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <ViewOglasi username={user.username}></ViewOglasi>
        </div>
        
    </section>);
}
export default ViewUser;