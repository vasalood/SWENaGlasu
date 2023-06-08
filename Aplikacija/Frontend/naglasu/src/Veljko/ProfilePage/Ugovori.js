import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import slika from './why_you_shouldnt_sign_a_3year_contract_for_an_hr_system_5e42d189785c2.jpg';
import { motion } from 'framer-motion';
import { useDispatch,useSelector,useEffect } from 'react';

export default function MultiActionAreaCard() {
  const dispatch=useDispatch();
  const user = useSelector(state =>({
    name:state.user.uname,
    surname:state.user.usurname,
    username:state.user.uusername,
    address:state.user.uaddress,
    email:state.user.uemail,
    phone:state.user.uphone,
    uplata:state.user.uuplata,
    role:state.user.urole,
    slika:state.user.uslika,
    id:state.user.uid
    //<span className="text-black-50">veljkoveljovic13@gmail.com</span>
  }));
  useEffect(() => {
    fetchFavorites(user.id, 0, 10, 'popularnost', '0');
   
  }, []);
  const fetchFavorites = (userId, M, N, orderBy, orderType) => {
    console.log(userId);
    const url = `http://localhost:5105/Oglas/VratiFavorite/${userId}?M=${M}&N=${N}&orderBy=${orderBy}&orderType=${orderType}`;
    
    fetch(url)
    .then(odgovor => odgovor.json())
    .then(odgovorTekst =>  {
          //console.log(odgovorTekst.lista.slikeZaSlanje[0].naziv);
          odgovorTekst.lista.forEach(element => {
              console.log(element.slikeZaSlanje[0].naziv);
          });
         // console.log(odgovorTekst.lista[0].slikeZaSlanje[0].naziv);
         
        
     } )
          .catch((error) => {
            console.log(error);
          });
  };

  return (
    
    <Card sx={{ maxWidth: 345 }}>
    <motion.div whileHover={{ scale: 1.03 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={slika}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Bicikla BMX 
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Specifikacije ugovora:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Datum sklapanja ugovora: 25.2.2022.
            <br />
            Kupac: Marko Janketic 
            <br />
            Kolicina: 2
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
      </motion.div>
    </Card>
    
  );
}