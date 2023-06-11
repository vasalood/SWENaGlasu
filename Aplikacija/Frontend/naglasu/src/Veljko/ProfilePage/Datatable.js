import './Datatable.css';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import mango from './mango.jpg';
import { useState,useEffect } from 'react';
import { Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';
import PopUpModal from '../LoginPage/PopUpModal';
import defaultSlika from './istockphoto-1300845620-612x612.jpg';
import { GridToolbarContainer,GridToolbarColumnsButton,GridToolbarFilterButton,GridToolbarDensitySelector,GridToolbarQuickFilter   } from '@mui/x-data-grid';
import Kategorija from '../../Vasa/Komponente/Kategorija';
const columns = [
  {
    field: 'user',
    headerName: 'User',
    width: 230,
    renderCell: (params) => {
      const slikaSrc = params.row.slika
        ? `data:image/jpeg;base64, ${params.row.slika}`
        : defaultSlika;

      return (
        <div className="cellWithImg">
          <img className="cellImg" src={slikaSrc} alt="Slika" />
          {params.row.username}
        </div>
        )
    }
},
{
    field:"firstName", headerName:"Ime"
},
{
    field:"lastName", headerName:"Prezime"
},
// {
//     field:"email", headerName:"Email",width:230
// },
{
    field:"rola", headerName:"Rola",width:120,
    cellRender:(params)=>{
        return(<div className={`cellWithStatus${params.row.rola}}`}></div>)
    }
},
{
field: "suspendovan",
headerName: "Suspendovan",
width: 120,
hide: true, 
renderCell: (params) => {
  const isSuspended = params.row.suspendOnTime;
  const isSuspended2 = params.row.suspendForEver;
  if(isSuspended || isSuspended2)
  {
    return <DoneIcon></DoneIcon>
  }
  else
  return <CloseIcon></CloseIcon>
},
}
];


export default function DataTable() {
  const[errorPop,setErrorPop]=useState();
  let token = localStorage.getItem('token');
  const authCtx = useContext(AuthContext);
    const [selectedRow, setSelectedRow] = useState(null);
  console.log(authCtx.token);
  const handleActionClick = (rowData) => {
   console.log(rowData.username);
   fetch("http://localhost:5105/Authentication/SuspendUserOnTime/"+rowData.username, {
    method: "PUT", // HTTP metoda koja se koristi za zahtev
    headers: {
      "Authorization":`Bearer ${token}`,
      "Content-Type": "application/json", // Tip sadržaja koji se šalje
    },
    body: JSON.stringify({
      // Objekat koji se šalje kao sadržaj
     
    }),
  }).then(odgovorTekst=>{
    setErrorPop({
      title:"Uspešno ste blokirali korisnika na mesec dana"
    });
  }) .catch((error) => {
    console.log(error);
  });
  };
  const handleActionClick2 = (rowData) => {
    console.log(rowData.username);
    fetch("http://localhost:5105/Authentication/SuspendujKorisnika/"+rowData.username, {
     method: "PUT", // HTTP metoda koja se koristi za zahtev
     headers: {
       "Authorization":`Bearer ${token}`,
       "Content-Type": "application/json", // Tip sadržaja koji se šalje
     },
     body: JSON.stringify({
       // Objekat koji se šalje kao sadržaj
      
     }),
   }).then(odgovorTekst=>{
    setErrorPop({
      title:"Uspešno ste blokirali korisnika."
    });
   }) .catch((error) => {
     console.log(error);
   });
   };
  const postaviModeratoraOnClick = (rowData) =>{
    console.log(rowData.username);
    fetch("http://localhost:5105/Authentication/PromeniRolu/"+rowData.username, {
     method: "PUT", // HTTP metoda koja se koristi za zahtev
     headers: {
      "Authorization":`Bearer ${token}`,
       "Content-Type": "application/json", // Tip sadržaja koji se šalje
     },
     body: JSON.stringify({
       // Objekat koji se šalje kao sadržaj
      
     }),
   }).then(odgovorTekst=>{
    setErrorPop({
      title:"Korisnik je postao moderator"
    });
   }) .catch((error) => {
     console.log(error);
   });
  }
    //   window.location.reload();

    //                        <button type="button" class="btn btn-outline-success">Success</button>

    // const actionColun2 = [
    //     {
    //         field:"action2",
    //         headerName:"SetModerator",
    //         width:250,
    //         renderCell:(params)=>{
    //             return(
                    
    //                     <Button variant="outlined"onClick={() => postaviModeratoraOnClick(params.row)}>SetAsModerator</Button>

                    
    //             )
    //         }
    //     }
    // ]

    const CustomToolbar = () => {
      return (
        <GridToolbarContainer>
          <GridToolbarQuickFilter ></GridToolbarQuickFilter> 
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
        </GridToolbarContainer>
      );
    };
    const unblockHandler = (rowData) =>{
        console.log(rowData.username);
        fetch("http://localhost:5105/Authentication/UnBlockUser/"+rowData.username, {
         method: "PUT", // HTTP metoda koja se koristi za zahtev
         headers: {
          "Authorization":`Bearer ${token}`,
           "Content-Type": "application/json", // Tip sadržaja koji se šalje
         },
         body: JSON.stringify({
           // Objekat koji se šalje kao sadržaj
          
         }),
       }).then(odgovorTekst=>{
        setErrorPop({
          title:"Korisnik je odblokiran"
        });
       }) .catch((error) => {
         console.log(error);
       });
    }
    // const actionColun3 = [
    //     {
    //         field:"action3",
    //         headerName:"UnBlockUser",
    //         width:250,
    //         renderCell:(params)=>{
    //             return(
    //                 <div className="cellAction">
    //                     <button type="button" class="btn btn-outline-success" onClick={() => unblockHandler(params.row)}>Odblokiraj korisnika</button>

    //                 </div>
    //             )
    //         }
    //     }
    // ]
    const [userRole, setUserRole] = useState('');
    
    console.log(token);
    const [users,SetUsers]=useState([]);
    const fetchUsers = () =>{
        // fetch("http://localhost:5105/Authentication/GetAllUsers",{
        //   headers:{
        //     "Authorization":`Bearer ${token}`
        //   }
        //   })
        //   .then(odgovor => odgovor.json())
        //     .then(odgovorTekst =>  {
        //         console.log(odgovorTekst);
        //         const fetchedUsers = odgovorTekst.map((user) => ({
        //             firstName: user.ime,
        //             lastName: user.prezime,
        //             email: user.email,
        //             username:user.userName,
        //             rola:user.rola,
        //             telefon:user.telefon,
        //             adresa:user.adresa,
        //             uplata:user.uplata,
        //             slika:user.slika,
        //             suspendOnTime:user.suspendOnTime,
        //             suspendForEver:user.suspendForEver
        //           }));
        //           console.log(fetchedUsers);
        //           SetUsers(fetchedUsers);
        //           setUserRole(fetchedUsers[0].rola);
        //      } )
        //           .catch((error) => {
        //             console.log(error);
        //           });
      
        
    }
    useEffect(()=>{
      fetch("http://localhost:5105/Authentication/GetAllUsers",{
        headers:{
          "Authorization":`Bearer ${token}`
        }
        })
        .then(odgovor => odgovor.json())
          .then(odgovorTekst =>  {
              console.log(odgovorTekst);
              console.log(token);
              const fetchedUsers = odgovorTekst.map((user) => ({
                  firstName: user.ime,
                  lastName: user.prezime,
                  email: user.email,
                  username:user.userName,
                  rola:user.rola,
                  telefon:user.telefon,
                  adresa:user.adresa,
                  uplata:user.uplata,
                  slika:user.slika,
                  suspendOnTime:user.suspendOnTime,
                  suspendForEver:user.suspendForEver
                }));
                console.log(fetchedUsers);
                SetUsers(fetchedUsers);
                setUserRole(fetchedUsers[0].rola);
           } )
                .catch((error) => {
                  console.log(error);
                  console.log(token);
                });
      
    },[]);

    const actionColun = [
      {
          field:"action",
          headerName:"Akcije",
          width:600,
          renderCell:(params)=>{
            const isAdmin = params.row.rola ==="Admin";
            const isModerator = params.row.rola ==="Moderator";
            const suspended = params.row.suspendOnTime ;
            const ime = params.row.firstName;
            console.log(ime);
            console.log(suspended);
            const suspended2 = params.row.suspendForEver;
            console.log(suspended2);
            let konacnoSuspendovan;
            if(suspended2==true)
            konacnoSuspendovan=true;
            else if(suspended==true)
            konacnoSuspendovan=true;
            else
            konacnoSuspendovan=false;
            return(
                  <div className="cellAction">
                      <Button variant="outlined" color="error"onClick={() => handleActionClick(params.row)} disabled={isAdmin|| suspended || suspended2} >BLOCK ON TIME</Button>
                      <button type="button" class="btn btn-outline-success" onClick={() => unblockHandler(params.row) } disabled={isAdmin || !konacnoSuspendovan}>UNBLOCK</button>
                      <Button variant="outlined"onClick={() => postaviModeratoraOnClick(params.row)} disabled={isAdmin|| isModerator||suspended || suspended2}>SetAsModerator</Button>
                      <button type="button" class="btn btn-outline-dark"onClick={() => handleActionClick2(params.row)} disabled={suspended||isAdmin} >Black List</button>
                  </div>
              )
          }
      }
  ]
  const errorHandler = () =>{
    setErrorPop(null);
    window.location.reload();
  }
  return (
    <>
    <div>
    <h1 style={{ marginBottom: '1rem', fontSize: '3rem', fontWeight: '800', color: '#333333', lineHeight: '1' }}>
  <span style={{ background: 'linear-gradient(to right, #3B82F6, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Admin</span> Panel
</h1>
    </div>
    <div className='datatable'>
       {errorPop?<PopUpModal title= {errorPop.title} message={errorPop.message} onConfirm={errorHandler}></PopUpModal>:null}
      <DataGrid
        rows={users}
        columns={columns.concat(actionColun)}
       pageSize={3}
       rowsPerPageOptions={[5]}
       getRowId={Math.random}
       components={{
        Toolbar: CustomToolbar
      }}
      
      />
       <h1 style={{ marginBottom: '3rem', fontSize: '3rem', fontWeight: '800', color: '#333333', lineHeight: '1',marginTop:'3rem' }}>
  <span style={{ background: 'linear-gradient(to right, #3B82F6, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Postavite novu </span> kategoriju
</h1>
      <Kategorija></Kategorija>
    </div>
    </>
  );
}
