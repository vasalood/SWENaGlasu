import './KarticaOglasNova.css';
import {Link} from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PlaceHolder from "../../Uros/Res/Slike/placeholder.jpg";
const KarticaOglasNova = (props)=>{
  console.log(props.oglas.id);
  // const fetchZaSlike = 'http://localhost:5105/Oglas/VratiSliku/';

  // const naslovnaSlika = props.slika.length === 0 ? 
  //                               PlaceHolder 
  //                               :
  //                               fetchZaSlike + props.slika.filter(slika => slika.redosled === 0)[0].naziv;
    return(<section className="section-meals">
      <Link  to={`/oglas/${props.oglas.id}`} style={{ textDecoration: 'none', color: 'black' }}>
      <div className="meal">
      <img src={"http://localhost:5105/Oglas/VratiSliku/"+props.slika} 
          className="meal-img"
          alt="Japanese Gyozas"
        />
        <div className="meal-content">
          <div className="meal-tags">
            <span className="tag tag--vegetarian">Kategorija {props.oglas.podkategorija.kategorijaNaziv}</span>
          </div>
          <p className="meal-title">{props.oglas.ime}</p>
          <ul className="meal-attributes">
            <li className="meal-attribute">
              
              <span>
              Cena: 
                <strong>{props.oglas.cena}</strong> RSD
              </span>
            </li>
            <li className="meal-attribute">
              
              <span>
                Vlasnik: 
                 <strong> {props.oglas.vlasnikUsername}</strong>
              </span>
            </li>
            <li className="meal-attribute">
            
              <span>
               Broj pregleda: 
                <strong>{props.oglas.brojPregleda}</strong>
              </span>
            </li>
          </ul>
        </div>
      </div>
      </Link>
  </section>
  )
}
export default KarticaOglasNova;