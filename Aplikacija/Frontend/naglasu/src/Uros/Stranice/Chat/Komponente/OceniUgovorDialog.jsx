import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FaFileContract } from 'react-icons/fa' 
import { MenuItem, Select,FormControl,InputLabel } from '@mui/material';

export default function OceniUgovorDialog({ugovorId,setOcenjenState}) {
  let token = localStorage.getItem('token');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

    const [dialogState, setDialogState] = React.useState(
        {
            komentar: '',
            vrednost:''
        }
    )
  const handleClose = async (ev) => {
      setOpen(false);
      if (ev.target.id !== 'cancel')
      {
          const mId = JSON.parse(localStorage.getItem('userState')).id
          const ocena =
          {
              ...dialogState,
              ugovorId
          }
         
        
          const ocenaRes = await fetch('http://localhost:5105/Ocena/OceniOglas',
          {
            method: "POST",
            headers:
            {
              "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(
                ocena
            )
              })
          if (!ocenaRes.ok)
              throw Error('Doslo je do greske.')
          else
            setOcenjenState(true)
         
        }
    };
    
    function handleOnChange(ev)
    {
        setDialogState(oldValue =>
        {
            const id = ev.target.id != undefined ? ev.target.id : ev.target.name
            console.log(id)
            return {
                ...oldValue,
                [id]:ev.target.value
            }
            })
            
    }
    const menuItems = [1, 2, 3, 4, 5].map(value =>
    
    {
        return <MenuItem value={value} key={value}>{value}</MenuItem>
    }    )
  return (
    <div>
    <Button size='small' id='oceni' onClick={handleClickOpen}>
              Oceni
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ocena</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="komentar"
                    label="Komentar"
                    type="text"
                    fullWidth
                    variant="standard"
                    className='mb-2'
                      multiline={true}
                      value={dialogState.komentar}
                      onChange={handleOnChange}
                    />
                <FormControl >
                <InputLabel id="ocena-label">Ocena</InputLabel>
                <Select
                        labelId='ocena-label'
                        onChange={handleOnChange}
                        value={dialogState.vrednost}
                        label='Ocena'
                        inputProps={
                              { name: 'vrednost' }}
                          style={{ width: '150px' }} 
                          className='mt-2'
                          
                >
                    {menuItems}
                </Select>
            </FormControl>
            </DialogContent>
        <DialogActions>
          <Button id='cancel' onClick={handleClose}>Cancel</Button>
          <Button id='accept' onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}