import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import React from 'react'
import DropDown from '../DropDown/DropDown'
import InputLabel from '@mui/material/InputLabel'

import './SortWindow.css'
import { BsSortDown, BsSortUp,BsSortDownAlt} from 'react-icons/bs'
import { FormControl,Dialog } from '@mui/material'

import Button from '@mui/material/Button'

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export function SortDialog({ stanja, seterStanja })
{

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      };
      

    function handleOnChange(ev)
    {
        seterStanja(oldValue =>
        {
            if (ev.target.name === 'sortBtn')
            {
                return {
                    ...oldValue,
                    orderType: Math.abs(oldValue.orderType - 1)
                }
                }
            return {
                ...oldValue,
                [ev.target.name]:ev.target.value
            }
            })
    }
    return (
        <div>
        <Button onClick={handleClickOpen}>
            <BsSortDownAlt size={30} />
        </Button>
          <Dialog open={open} onClose={handleClose} sx={{
              '& .MuiDialog-paper':
              {
                  maxWidth:"350px"
              }
          }} >
        <DialogTitle className='text-center'>Sortiranje</DialogTitle>
        <DialogContent>
        <FormControl >
        <InputLabel id="orderBy--label">Poredjaj po</InputLabel>
        <Select  labelId='orderBy--label'
                        className='sortWindow--select'
                        onChange={handleOnChange}
                        value={stanja.orderBy}
                        label='Poredjaj po'
                        inputProps={
                { name: 'orderBy' }}>
            <MenuItem value='' key=''></MenuItem>
            <MenuItem value='cena' key='cena'>Cena</MenuItem>
            <MenuItem value='popularnost' key='popularnost'>Popularnost</MenuItem>
            <MenuItem value='datum' key='datum'>Datum</MenuItem>
            <MenuItem value='kolicina' key='kolicina'>Količina</MenuItem>
            <MenuItem value='naziv' key='naziv'>Naziv</MenuItem>
            </Select>
        </FormControl>
        <div className='sortWindow--row'>
            <Button name='sortBtn' className='sortWindow--sortBtn' onClick={
                (ev) => {
                    handleOnChange(ev)
                }
            }>
                {stanja.orderType === 1 ? <BsSortDown size={30} name='sortBtn' /> : <BsSortUp size={30} name='sortBtn' />}
            </Button>
            <FormControl >
                <InputLabel id="brojOglasa--label">Broj oglasa po stranici</InputLabel>
                <Select  labelId='brojOglasa--label'
                        className='sortWindow--selectBroj'
                        onChange={handleOnChange}
                        value={stanja.brojOglasa}
                        label='Broj oglasa po stranici'
                        inputProps={
                        { name: 'brojOglasa' }}>
                <MenuItem value={3} key={3}>3</MenuItem>
                <MenuItem value={6} key={6}>6</MenuItem>
                <MenuItem value={9} key={9}>9</MenuItem>
                <MenuItem value={12} key={12}>12</MenuItem>
                </Select>
            </FormControl>                 
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}
export default function SortWindow({active,setActive,stanja,seterStanja})
{

    function handleOnChange(ev)
    {
        seterStanja(oldValue =>
        {
            if (ev.target.name === 'sortBtn')
            {
                return {
                    ...oldValue,
                    orderType: Math.abs(oldValue.orderType - 1)
                }
                }
            return {
                ...oldValue,
                [ev.target.name]:ev.target.value
            }
            })
    }
    return (<DropDown active={active} setActive={setActive} id='sortWindow' containerId='sortWindow--inner'>
         <FormControl >
        <InputLabel id="orderBy--label">Poredjaj po</InputLabel>
        <Select  labelId='orderBy--label'
                        className='sortWindow--select'
                        onChange={handleOnChange}
                        value={stanja.orderBy}
                        label='Poredjaj po'
                        inputProps={
                { name: 'orderBy' }}>
            <MenuItem value='' key=''></MenuItem>
            <MenuItem value='cena' key='cena'>Cena</MenuItem>
            <MenuItem value='popularnost' key='popularnost'>Popularnost</MenuItem>
            <MenuItem value='datum' key='datum'>Datum</MenuItem>
            <MenuItem value='kolicina' key='kolicina'>Količina</MenuItem>
            <MenuItem value='naziv' key='naziv'>Naziv</MenuItem>
            </Select>
        </FormControl>
        <div className='sortWindow--row'>
            <button name='sortBtn' className='sortWindow--sortBtn' onClick={
                (ev) => {
                    handleOnChange(ev)
                }
            }>
                {stanja.orderType === 1 ? <BsSortDown size={30} name='sortBtn' /> : <BsSortUp size={30} name='sortBtn' />}
            </button>
            <FormControl >
                <InputLabel id="brojOglasa--label">Broj oglasa po stranici</InputLabel>
                <Select  labelId='brojOglasa--label'
                        className='sortWindow--selectBroj'
                        onChange={handleOnChange}
                        value={stanja.brojOglasa}
                        label='Broj oglasa po stranici'
                        inputProps={
                        { name: 'brojOglasa' }}>
                <MenuItem value={3} key={3}>3</MenuItem>
                <MenuItem value={6} key={6}>6</MenuItem>
                <MenuItem value={9} key={9}>9</MenuItem>
                <MenuItem value={12} key={12}>12</MenuItem>
                </Select>
            </FormControl>                 
        </div>
        
    </DropDown>)
}