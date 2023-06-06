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
import { GridToolbarContainer,GridToolbarColumnsButton,GridToolbarFilterButton,GridToolbarDensitySelector,GridToolbarQuickFilter   } from '@mui/x-data-grid';
const columns = [
  {field:"user",headerName:"User",width:230,
    renderCell:(params)=>{
        return(
            <div className="cellWithImg">
                <img className ="cellImg" src={`data:image/jpeg;base64, ${params.row.slika}`} alt="Slika"/>
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
{
    field:"email", headerName:"Email",width:230
},
{
    field:"rola", headerName:"Rola",width:120,
    cellRender: (params) => {
        if (params.row.rola !== "Admin") {
          return <div className={`cellWithStatus${params.row.rola}`}></div>;
        } else {
          return null; // ili neki drugi sadržaj ukoliko ne želite ništa prikazati za korisnike sa ulogom "Admin"
        }
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
    let token = localStorage.getItem('token');
    console.log(token);
  const authCtx = useContext(AuthContext);
    const [selectedRow, setSelectedRow] = useState(null);
  console.log(authCtx.token);
  const handleActionClick = (rowData) => {
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
    console.log(odgovorTekst);
  }) .catch((error) => {
    console.log(error);
  });
  };
  const handleActionClick2 = (rowData) => {
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
     console.log(odgovorTekst);
   }) .catch((error) => {
     console.log(error);
   });
   };
  
    
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
         console.log(odgovorTekst);
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

    const [users,SetUsers]=useState([]);
    const fetchUsers = () =>{
        console.log(token);
        fetch("http://localhost:5105/Authentication/GetAllUsers",{
          headers:{
            "Authorization":`Bearer ${token}`
           
          }
          })
          .then(odgovor => odgovor.json())
            .then(odgovorTekst =>  {
                console.log(odgovorTekst);
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
                  });
      
        
    }
    useEffect(()=>{
        fetchUsers();
        console.log(users[0]);
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
            const suspended2 = params.row.suspendForEver;
            let konacnoSuspendovan;
            if(suspended2==true)
            konacnoSuspendovan=true;
            else if(suspended==true)
            konacnoSuspendovan=true;
            else
            konacnoSuspendovan=false
              return(
                  <div className="cellAction">
                      <Button variant="outlined" color="error"onClick={() => handleActionClick2(params.row)} disabled={isAdmin|| suspended || suspended2} >BLOCK ON TIME</Button>
                      <button type="button" class="btn btn-outline-success" onClick={() => unblockHandler(params.row) } disabled={isAdmin || !konacnoSuspendovan}>UNBLOCK</button>
                      <button type="button" class="btn btn-outline-dark" disabled={suspended||isAdmin} onClick={() => handleActionClick(params.row)} >Black List</button>
                  </div>
              )
          }
      }
  ]

  return (
    <div className='datatable'>
      <DataGrid
        rows={users.filter(user=>user.role!=='Admin')}
        columns={columns.concat(actionColun)}
       pageSize={3}
       rowsPerPageOptions={[5]}
       getRowId={Math.random}
       components={{
        Toolbar: CustomToolbar
      }}
      
      />
      
    </div>
  );
}
