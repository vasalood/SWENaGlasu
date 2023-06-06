import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import React from 'react'

export default function UgovorStavka({opis,kolicina,smer})
{
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
            {smer!==0&&<CardActions>
                <Button size="small">Prihvati</Button>
                <Button size="small">Odbij</Button>
            </CardActions>}
    </Card>
    )
}