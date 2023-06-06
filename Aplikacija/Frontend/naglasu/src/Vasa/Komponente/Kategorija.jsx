import { useState } from "react";

export default function Kategorija() {

  const [nazivKategorije, setNazivKategorije] = useState("");
  const [nazivPolja, setNazivPolja] = useState("");
  const [polja, setPolja] = useState([]);

  function handleNovoPolje(e) {
    e.preventDefault();
    
    if(nazivPolja === '')
      return;

    if (polja.some((polje) => polje.naziv.toLowerCase() === nazivPolja.toLowerCase())) {
      alert("Već ste dodali takvo polje");
      return;
    }

    setPolja((currentPolja) => {
      return [
        ...currentPolja,
        {naziv: nazivPolja, tip: document.getElementById('tipPolja').value}
      ]
    })

    setNazivPolja('');
  }

  function obrisiPolje(naziv) {
    setPolja(currentPolja => currentPolja.filter(polje => polje.naziv !== naziv))
  }

  return (
    <>
      <form className="kategorija">

        <div className="kategorija-naslov">

          <h2><label htmlFor="naslov">NAZIV KATEGORIJE:</label></h2>
          <input 
            value={nazivKategorije} 
            onChange={e => setNazivKategorije(e.target.value)} 
            type="text" 
            id="naslov" 
            required></input>

        </div>

        <div className="kategorija-polja-naslov">

          <h3><label htmlFor="nazivPolja">Polje kategorije</label></h3>
          <h3><label htmlFor="tipPolja">Tip unosa</label></h3>

        </div>

        <div className="kategorija-polja">

          <input 
            value={nazivPolja} 
            onChange={e => setNazivPolja(e.target.value)} 
            type="text" 
            id="nazivPolja" 
            required></input>

          <div className="select-i-button">

            <select id="tipPolja">
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

        <div className="lista-polja">
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
        </div>

        <div className="kategorija-postavi">

          <button type="submit" className="dodaj-kategoriju-button">Dodaj kategoriju</button>

        </div>

      </form>
    </>
  )
}