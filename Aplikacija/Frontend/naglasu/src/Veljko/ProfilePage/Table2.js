import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState,useEffect } from 'react';
import './Table2.css';
import mango from './mango.jpg';
function Table2() {
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
                    uplata:user.uplata,
                    slika:user.slika
                  }));
                  fetchedUsers.forEach(element => {
                    console.log(element.slika);
});                 
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
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell className ="tableCell">User</TableCell>
               <TableCell className ="tableCell">Ime</TableCell>
               <TableCell className ="tableCell">Prezime</TableCell>
               <TableCell className ="tableCell">Email</TableCell>
               <TableCell className ="tableCell">Telefon</TableCell>
               <TableCell className ="tableCell">Adresa</TableCell>
               <TableCell className ="tableCell">Rola</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <TableRow
                  key={row.username}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                  <TableCell className ="tableCell" ><div className='cellWrapper'><img src={`data:image/jpeg;base64, ${row.slika}`} alt="Slika" className='image'/>{row.username}</div></TableCell>
                  <TableCell className ="tableCell">{row.firstName}</TableCell>
                  <TableCell className ="tableCell">{row.lastName}</TableCell>
                  <TableCell className ="tableCell">{row.email}</TableCell>
                  <TableCell className ="tableCell">{row.telefon}</TableCell>
                  <TableCell className ="tableCell">{row.adresa}</TableCell>
                  <TableCell className ="tableCell">
                    <span className={`status ${row.rola}`}>
                    {row.rola}</span>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default Table2;
