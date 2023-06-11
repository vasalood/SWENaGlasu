import { useState } from "react";
import "./Kategorija.css"
import PopUpModal from '../../Veljko/LoginPage/PopUpModal';

export default function Kategorija() {
  const[errorPop,setErrorPop]=useState();
  //state za cuvanje vrednosti inputa za naziv nove kategorije
  const [nazivKategorije, setNazivKategorije] = useState("");
  //state za cuvanje vrednosti inputa za naziv polja kategorije
  const [nazivPolja, setNazivPolja] = useState("");
  //state za cuvanje vrednosti selecta za tip unosa polja kategorije
  const [tipUnosa, setTipUnosa] = useState("nijeIzabran");
  //state za cuvanje svih polja koja se odnose na novu kategoriju
  //cuva se niz objekata koji sadrze naziv: nazivPolja, tip: tipUnosa
  const [polja, setPolja] = useState([]);
  //state za cuvanje vrednosti inputa za naziv podkategorije
  const [nazivPodkategorije, setNazivPodkategorije] = useState("");
  //state za cuvanje niza svih podkategorija koji se odnose na novu kategoriju
  const [podkategorije, setPodkategorije] = useState([]);

  function handleDodajKategoriju(e) {
    e.preventDefault();

    const poljaZaReqBody = {}

    if(polja.length == 0) {
      setErrorPop({
        title:"Unesite bar jedno polje"
      });
      return;
    }
    if(podkategorije.length == 0) {
      setErrorPop({
        title:"Unesite bar jednu podkategoriju"
      });
      return;
    }

    polja.forEach(polje => {
      poljaZaReqBody[polje.naziv] = polje.tip;
    })

    const requestBody = {
      ime: nazivKategorije,
      polja: poljaZaReqBody,
      podkategorije: podkategorije
    }

    fetch('http://localhost:5105/Kategorija/PostaviKategoriju',
      {
          method: "POST",
          headers:
          {
              "Content-Type":"application/json"
          },
          body: JSON.stringify(
            requestBody
          )
      }).then(s => {
        if(s.ok) setErrorPop({
          title:"Dodata je nova kategorija"
        });
        else setErrorPop({
          title:"Došlo je do greške"
        });
      })

      setNazivKategorije('');
      setNazivPolja('');
      setTipUnosa('nijeIzabran');
      setPolja([]);
      setNazivPodkategorije('');
      setPodkategorije([]);
  }

  function handleNovoPolje(e) {
    e.preventDefault();
    
    if(nazivPolja === '')
      return;

    if (polja.some((polje) => polje.naziv.toLowerCase() === nazivPolja.toLowerCase())) {
      setErrorPop({
        title:"Već ste dodali takvo polje"
      });
      return;
    }

    if(tipUnosa === 'nijeIzabran') {
      setErrorPop({
        title:"Morate da odaberete tip unosa"
      });
      return;
    }

    setPolja((currentPolja) => {
      return [
        ...currentPolja,
        {naziv: nazivPolja, tip: tipUnosa}
      ]
    })

    setNazivPolja('');
  }

  function obrisiPolje(naziv) {
    setPolja(currentPolja => currentPolja.filter(polje => polje.naziv !== naziv))
  }

  function handleNovaPodkategorija(e) {
    e.preventDefault();
    
    if(nazivPodkategorije === '')
      return;

    if (podkategorije.some(podkategorija => podkategorija.toLowerCase() === nazivPodkategorije.toLowerCase())) {
      setErrorPop({
        title:"Već ste dodali takvo polje"
      });
      return;
    }

    setPodkategorije(prevPodkategorije => [...prevPodkategorije, nazivPodkategorije]);

    setNazivPodkategorije('');
  }

  function obrisiPodkategoriju(naziv) {
    setPodkategorije(currentPodkategorije => currentPodkategorije.filter(podkategorija => podkategorija !== naziv))
  }
  const errorHandler = ()=>{
    setErrorPop(null);
  }
  return (
    <form className="kategorija" onSubmit={handleDodajKategoriju}>
        {errorPop?<PopUpModal title= {errorPop.title} message={errorPop.message} onConfirm={errorHandler}></PopUpModal>:null}
      <div className="kategorija-naslov">

        <label htmlFor="naslov">Naziv kategorije:</label>
        <input 
          value={nazivKategorije} 
          onChange={e => setNazivKategorije(e.target.value)} 
          type="text" 
          id="naslov"
          className="inputselect"
          required></input>

      </div>

      {/* <div className="kategorija-polja-naslov">

        <label htmlFor="nazivPolja">Polje kategorije</label>
        <label htmlFor="tipPolja"></label>

      </div> */}

      <div className="kategorija-polja">
      <label htmlFor="nazivPolja">Polje kategorije</label>
        <input 
          value={nazivPolja} 
          onChange={e => setNazivPolja(e.target.value)} 
          type="text" 
          id="nazivPolja"
          className="inputselect"
          ></input>
        <div className="select-i-button">

          <select className="inputselect selectt" id="tipPolja" onChange={e => setTipUnosa(e.target.value)}>
            <option value="nijeIzabran">Izaberi</option>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
            <option value="date">Date</option>
            <option value="checkbox">Checkbox</option>
          </select>
          <button 
            type="button" 
            className="add-button" 
            onClick={handleNovoPolje}>
              +
          </button>

        </div>

      </div>

      {polja.length !== 0 && <div className="lista-polja">
        <h3>Polja:</h3>
        <ul>
          {polja.map(polje => {
            return (
            <li key={polje.naziv}>
              <label>{polje.naziv}: {polje.tip}</label>
              <button type="button" onClick={() => obrisiPolje(polje.naziv)} className="add-button remove-button">-</button>
            </li>
          )
          })}
        </ul>
      </div>}

      <div className="kategorija-naslov">

        <label htmlFor="podkategorije">Polje podkategorije:</label>
        <input 
          value={nazivPodkategorije} 
          onChange={e => setNazivPodkategorije(e.target.value)} 
          type="text" 
          id="podkategorije" 
          className="inputselect"
          ></input>
        <button type="button" onClick={handleNovaPodkategorija}  className="add-button">+</button>
      </div>

      {podkategorije.length !== 0 && <div className="lista-polja">
        <h3>Podkategorije:</h3>
        <ul>
          {podkategorije.map(podkategorija => {
            return (
            <li key={podkategorija}>
              <label>{podkategorija}</label>
              <button type="button" onClick={() => obrisiPodkategoriju(podkategorija)} className="add-button remove-button">-</button>
            </li>
          )
          })}
        </ul>
      </div>}

      <div className="kategorija-postavi">

        <button type="submit" className="btn btn-primary dodaj-kategoriju-button">Dodaj kategoriju</button>

      </div>

    </form>
  )
}