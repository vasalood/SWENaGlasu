import './Datatable.css';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import mango from './mango.jpg';
import { useState,useEffect } from 'react';
import { Button } from '@mui/material';
const columns = [
  {field:"user",headerName:"User",width:230,
    renderCell:(params)=>{
        return(
            <div className="cellWithImg">
                <img className="cellImg" src ={mango} alt="avatar"/>
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
    field:"rola", headerName:"Rola",width:160,
    cellRender:(params)=>{
        return(<div className={`cellWithStatus${params.row.rola}}`}></div>)
    }
},
];



export default function DataTable() {
    const [selectedRow, setSelectedRow] = useState(null);

  const handleActionClick = (rowData) => {
   console.log(rowData.username);
   fetch("http://localhost:5105/Authentication/SuspendujKorisnika/"+rowData.username, {
    method: "PUT", // HTTP metoda koja se koristi za zahtev
    headers: {
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
  const postaviModeratoraOnClick = (rowData) =>{
    console.log(rowData.username);
    fetch("http://localhost:5105/Authentication/PromeniRolu/"+rowData.username, {
     method: "PUT", // HTTP metoda koja se koristi za zahtev
     headers: {
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
    const actionColun = [
        {
            field:"action",
            headerName:"SuspendUser",
            width:250,
            renderCell:(params)=>{
                return(
                    <div className="cellAction">
                        <Button variant="outlined" color="error"onClick={() => handleActionClick(params.row)}>SuspendUser</Button>
                    </div>
                )
            }
        }
    ]
    //                        <button type="button" class="btn btn-outline-success">Success</button>

    const actionColun2 = [
        {
            field:"action2",
            headerName:"SetModerator",
            width:250,
            renderCell:(params)=>{
                return(
                    <div className="cellAction">
                        <Button variant="outlined"onClick={() => postaviModeratoraOnClick(params.row)}>SetAsModerator</Button>

                    </div>
                )
            }
        }
    ]
    const unblockHandler = (rowData) =>{
        console.log(rowData.username);
        fetch("http://localhost:5105/Authentication/UnBlockUser/"+rowData.username, {
         method: "PUT", // HTTP metoda koja se koristi za zahtev
         headers: {
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
    const actionColun3 = [
        {
            field:"action3",
            headerName:"UnBlockUser",
            width:250,
            renderCell:(params)=>{
                return(
                    <div className="cellAction">
                        <button type="button" class="btn btn-outline-success" onClick={() => unblockHandler(params.row)}>Odblokiraj korisnika</button>

                    </div>
                )
            }
        }
    ]
    const [users,SetUsers]=useState([]);
    const fetchUsers = () =>{
        fetch("http://localhost:5105/Authentication/GetAllUsers",{
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
                    uplata:user.uplata
                  }));
                  console.log(fetchedUsers);
                  SetUsers(fetchedUsers);
             } )
                  .catch((error) => {
                    console.log(error);
                  });
      
        
    }
    useEffect(()=>{
        fetchUsers();
        console.log(users[0]);
    },[]);
   

  return (
    <div className='datatable'>
      <DataGrid
        rows={users}
        columns={columns.concat(actionColun).concat(actionColun2).concat(actionColun3)}
       pageSize={5}
       rowsPerPageOptions={[5]}
       checkboxSelection
       getRowId={Math.random}
     
      />
      
    </div>
  );
}
