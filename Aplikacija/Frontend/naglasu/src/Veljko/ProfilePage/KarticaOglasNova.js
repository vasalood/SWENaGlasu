import './KarticaOglasNova.css';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const KarticaOglasNova = (props)=>{
    return(<section className="section-meals">
    
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
    
  </section>
  )
}
export default KarticaOglasNova;