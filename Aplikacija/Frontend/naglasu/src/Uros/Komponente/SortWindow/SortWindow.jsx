import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import React from 'react'
import DropDown from '../DropDown/DropDown'
import InputLabel from '@mui/material/InputLabel'

import './SortWindow.css'
import { BsSortDown, BsSortUp} from 'react-icons/bs'
import { FormControl } from '@mui/material'

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
                {stanja.orderType === 0 ? <BsSortDown size={30} name='sortBtn' /> : <BsSortUp size={30} name='sortBtn' />}
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
                <MenuItem value={10} key={10}>10</MenuItem>
                <MenuItem value={20} key={20}>20</MenuItem>
                <MenuItem value={50} key={50}>50</MenuItem>
                </Select>
            </FormControl>                 
        </div>
        
    </DropDown>)
}