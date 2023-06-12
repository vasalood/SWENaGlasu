import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import React from 'react'
import ConnectionContext from '../../../Contexts/ConnectionContext';
import ChatContext from '../../../Contexts/ChatContext';
import OceniUgovorDialog from './OceniUgovorDialog';

export default function UgovorStavka({opis,kolicina,smer,id,prihvacen,odbijen,ocenjen})
{

    //console.log(`stats: id: ${id}, prihvacen: ${prihvacen}, odbijen: ${odbijen}`)
    const [ugovorState, setUgovorState] = React.useState(
        {
            prihvacen: prihvacen,
            odbijen:odbijen
        }
    )
    const [ocenjenState, setOcenjenState] = React.useState(ocenjen)
    
    
    const { connectionState } = React.useContext(ConnectionContext)
    const {chatState} = React.useContext(ChatContext)
    async function onClickEventHandler(ev)
    {
        const sendVal = ev.target.id === 'prihvati' ? true : false
        try {
            const response = await fetch('http://localhost:5105/Ugovor/PrihvatiIliOdbijUgovor/' + id + '/' + sendVal,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' }
            })
            if (response.ok)
            {
                const prop = sendVal ? 'prihvacen' : 'odbijen'
                
                setUgovorState(oldValue =>
                {
                    return {
                        ...oldValue,
                        [prop]:true
                    }
                })
                connectionState.invoke('ConfirmOrRejectContract',chatState.currentChat.receiverUsername,id,sendVal)
            }
            else
                throw Error('Doslo je do greske.')
        }
        catch (e)
        {
            console.log(e.message)
        }
      
    }
    async function oceni()
    {
        const ocena = {
            
        }
    }
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ponuda
                </Typography>
                <Typography variant="h6" component="div">
                    {opis!==undefined?opis:''}
                </Typography>
                <br></br>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {kolicina!==undefined?'Količina: '+kolicina:''}
                </Typography>
            </CardContent>
            <CardActions>
                {smer !== 0 ?
                    !ugovorState.prihvacen && !ugovorState.odbijen && <>
                        <Button size="small" id='prihvati' onClick={onClickEventHandler}>Prihvati</Button>
                        <Button size="small" id='odbij' onClick={onClickEventHandler}>Odbij</Button>
                    </> :
                    ugovorState.prihvacen && !ocenjenState && <OceniUgovorDialog
                        setOcenjenState={setOcenjenState}
                        ugovorId={id } />}
                    {/* <Button size='small' id ='oceni' onClick={oceni}>Oceni</Button>} */}
                </CardActions>
    </Card>
    )
}