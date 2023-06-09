import { useState } from "react";
import "./Kategorija.css"

export default function Kategorija() {

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
      alert("Unesite bar jedno polje");
      return;
    }
    if(podkategorije.length == 0) {
      alert('Unesite bar jednu podkategoriju');
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
        if(s.ok) alert('Dodata je nova kategorija!');
        else alert('Doslo je do greske');
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
      alert("Već ste dodali takvo polje");
      return;
    }

    if(tipUnosa === 'nijeIzabran') {
      alert('Morate da odaberete tip unosa!');
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
      alert("Već ste dodali takvo polje");
      return;
    }

    setPodkategorije(prevPodkategorije => [...prevPodkategorije, nazivPodkategorije]);

    setNazivPodkategorije('');
  }

  function obrisiPodkategoriju(naziv) {
    setPodkategorije(currentPodkategorije => currentPodkategorije.filter(podkategorija => podkategorija !== naziv))
  }

  return (
    <form className="kategorija" onSubmit={handleDodajKategoriju}>

      <div className="kategorija-naslov">

        <label htmlFor="naslov">Naziv kategorije:</label>
        <input 
          value={nazivKategorije} 
          onChange={e => setNazivKategorije(e.target.value)} 
          type="text" 
          id="naslov"
          required></input>

      </div>

      <div className="kategorija-polja-naslov">

        <label htmlFor="nazivPolja">Polje kategorije</label>
        <label htmlFor="tipPolja">Tip unosa</label>

      </div>

      <div className="kategorija-polja">

        <input 
          value={nazivPolja} 
          onChange={e => setNazivPolja(e.target.value)} 
          type="text" 
          id="nazivPolja"></input>

        <div className="select-i-button">

          <select id="tipPolja" onChange={e => setTipUnosa(e.target.value)}>
            <option value="nijeIzabran">Izaberi</option>
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
            <option value="date">Date</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="file">File</option>
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