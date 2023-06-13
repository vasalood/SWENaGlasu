import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaFileContract } from 'react-icons/fa' 

export default function AddUgovorDialog({onSubmit,dialogState,setDialogState,oglasId,setErrorPop}) {
  const [open, setOpen] = React.useState(false);
  let token = localStorage.getItem('token');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async (ev) => {
      setOpen(false);
      if (ev.target.id !== 'cancel')
      {
        try {
          const mId = JSON.parse(localStorage.getItem('userState')).id
          const ugovor=
          {
              id: 0,
              kupacId: mId,
              oglasId: oglasId,
            prihvacen: false,
              odbijen:false,
              opis: dialogState.opis,
              kolicina:Number.parseInt(dialogState.kolicina)
          }
          //console.log(ugovor)
          if (ugovor.kolicina <= 0)
              throw Error('Kolicina mora da bude veca od nule.');
          const ugovorRes = await fetch('http://localhost:5105/Ugovor/PostaviUgovor',
          {
            method: "POST",
            headers:
            {
              "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(
                ugovor
            )
              })
          if (!ugovorRes.ok)
              throw Error('Doslo je do greske.')
          ugovor.id = Number.parseInt(await ugovorRes.json())
          setDialogState(oldValue =>
          {
              return {
                  ...oldValue,
                  ugovorId:ugovor.id
              }
          })
        
          onSubmit(ugovor.id)
        }
        catch (e)
        {
          setErrorPop({
            title: 'Došlo je do greške!'
        })
        }
      
        }
    };
    
    function handleOnChange(ev)
    {
        setDialogState(oldValue =>
        {
            return {
                ...oldValue,
                [ev.target.id]:ev.target.value
            }
            })
            
    }

  return (
    <div>
      <Button  onClick={handleClickOpen}>
        <FaFileContract size={30} />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nova ponuda</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="opis"
                    label="Opis"
                    type="text"
                    fullWidth
                    variant="standard"
                    className=''
                      multiline={true}
                      value={dialogState.opis}
                      onChange={handleOnChange}
                    />
                <TextField
                    id='kolicina'
                    type='number'
                    label='Količina'
                      className='mt-2'
                      value={dialogState.kolicina}
                      onChange={handleOnChange}
                />
            </DialogContent>
        <DialogActions>
          <Button id='cancel' onClick={handleClose}>Cancel</Button>
          <Button id='accept' onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}