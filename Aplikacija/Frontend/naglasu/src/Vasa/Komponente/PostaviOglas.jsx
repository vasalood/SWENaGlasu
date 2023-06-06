import React, { useState, useEffect } from "react";
import "./PostaviOglas.css";

const PostaviOglas = () => {
  //state za cuvanje vrednosti inputa naziv oglasa
  //cuva string vrednost
  const [nazivOglasa, setNazivOglasa] = useState("");

  //state za cuvanje vrednosti inputa cena
  //cuva string vrednost potrebno parsovati za dobijanje numbera
  const [cena, setCena] = useState("");

  //state za cuvanje vrednosti inputa kolicina
  //cuva string vrednost potrebno parsovati za dobijanje numbera
  const [kolicina, setKolicina] = useState("");
 
  //state za cuvanje vrednosti inputa lokacija
  //cuva string vrednost
  const [lokacija, setLokacija] = useState("");

  //state za cuvanje vrednosti selectovanog stanja iz select elementa
  //cuva string vrednost potrebno parsovati u number
  const [stanje, setStanje] = useState("nijeIzabrano");

  //state za cuvanje vrednosti textarea opis
  //cuva string vrednost
  const [opis, setOpis] = useState("");

  //state za cuvanje vrednosti selectovane kategorije iz select elementa
  //cuva id kategorije u vidu string vrednosti koju je potrebno parsovati u number
  const [odabranaKategorija, setOdabranaKategorija] = useState("nijeIzabrana");
  
  //state za cuvanje svih kategorija koje povlacimo sa servera 
  const [kategorije, setKategorije] = useState([]);

  //state za cuvanje slika koje ubacujemo
  //cuva vrednost tipe FileList koji je niz objekata File koji imaju informacije o nazivu slike
  //datumu dodavanja, size, type
  const [files, setFiles] = useState(null);
  
  //state za conditional rendering
  const [slikeIzabrane, setSlikeIzabrane] = useState(false);

  //state za prikaz broja izabranih slika
  const [brIzabranihSlika, setBrIzabranihSlika] = useState(0);

  //glavna funkcija za prikupljanje podataka iz forme 
  //proslediti joj id kategorije iz state odabranaKategorija
  //id podkategorije iz state odabranaPodkategorija
  //slike koje smo ubacili?
  //datum (datetime now)
  //opis
  //naziv oglasa
  //kolicina
  //cena
  //lokacija
  //stanje parsovano u 0,1,2
  //polja kategorije iz state vrednostiPolja
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Ovde možete dodati logiku za obradu podataka obrasca

    //upload slika
    const formData = new FormData();

    for(let i = 0; i < files.length; i++) {
      formData.append(`images[${i}]`, files[i]);
    }
  };
  //kraj funkcije za prikupljanje podataka iz forme


  //fetch-om vracamo sve kategorije sa servera
  useEffect(() => {
    fetch("http://localhost:5206/Kategorija/VratiKategorije")
      .then((response) => response.json())
      .then(data => {
        setKategorije(data);
      })
      .catch((error) => {
        console.error("Greška prilikom dobijanja kategorija:", error);
      });
  }, []);


  //state za uzimanje odgovarajucih polja selectovane kategorije
  const [poljaKategorije, setPoljaKategorije] = useState(null);

  //funkcija koja na osnovu izabrane kategorije (njenog id-a) setuje gornji state
  function handlePoljaKategorije(id) {
    const kategorijaZaPolja = kategorije.filter(kategorija => kategorija.id === parseInt(id));
    //console.log(kategorijaZaPolja);
    setPoljaKategorije(id === 'nijeIzabrana' ? null : kategorijaZaPolja[0].polja);
  }

  //funkcija koja sva polja odredjene kategorije pretvara u niz objekata zbog renderovanja na stranicu
  function skupiPoljaKategorije() {
    let retValue = [];
    for(const polje in poljaKategorije) {
      if(poljaKategorije.hasOwnProperty(polje))
        retValue.push({naziv: polje, tip: poljaKategorije[polje]});
    }
    return retValue;
  }

  //state koji cuva vrednosti koje se unose za odgovarajuca polja
  //cuva objekat koji sadrzi kljuceve NazivPolja i vrednosti koju korisnik zada u inputu za ta polja
  //odredjene kategorije
  const [vrednostiPolja, setVrednostiPolja] = useState({});

  //funkcija koja prati promene vrednosti samih polja od strane korisnika i setuje gornji state 
  const handlePoljeChange = (e, nazivPolja) => {
    const novaVrednost = e.target.type === 'checkbox' ?
                                              e.target.checked ? 
                                                'Da' : 'Ne' 
                                                : e.target.value;
    console.log('Nova vrednost je: ' + novaVrednost);
    setVrednostiPolja(prevVrednostiPolja => ({
      ...prevVrednostiPolja,
      [nazivPolja]: novaVrednost
    }));
  };


  //state za cuvanje podkategorije koja je izabrana
  //cuva id podkategorije u vidu stringa potrebno parsovati
  const [odabranaPodkategorija, setOdabranaPodkategorija] = useState("nijeIzabrana");

  //state za cuvanje svih podkategorija jedne kategorije koje se listaju u select elementu
  const [podkategorije, setPodkategorije] = useState([]);

  //hendlujemo koje podkategorije da se nadju u select elementu za izbor podkategorije
  function handleOptionsPodkategorije(id) {
    const kategorijaZaPodkategoriju = kategorije.filter(kategorija => kategorija.id === parseInt(id));
    setPodkategorije(id === 'nijeIzabrana' ? [] : kategorijaZaPodkategoriju[0].podkategorije);
  }

  //hendlujemo ubacivanje slika
  function handleChange(e) {

    if(e.target.files.length > 5) {
      alert("Mozete izabrati najvise 5 slika!");
      e.target.value = null;
      return;
    }

    setBrIzabranihSlika(e.target.files.length);
    setFiles(e.target.files);
    setSlikeIzabrane(true);
  }

  function handleButtonClick() {
    const fileInput = document.querySelector('.slike');
    fileInput.click();
  }
  //zavrsavamo hendlovanje ubacivanja slika

  // useEffect(() => {
  //   console.log(vrednostiPolja);
  // }, [vrednostiPolja]);
  //console.log(odabranaKategorija);

  // useEffect(() => {
  //   console.log('Podkategorije: ' + podkategorije);
  // }, [podkategorije]);

  // useEffect(() => {
  //   console.log('odabranaPodkategorija: ' + odabranaPodkategorija);
  // }, [odabranaPodkategorija]);

  // useEffect(() => {
  //   console.log('odabranaKategorija: ' + odabranaKategorija);
  // }, [odabranaKategorija]);
  console.log(kategorije);

  return (
    <div className="postavi-oglas-container">
      <form className="postavi-oglas-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="nazivOglasa">Naziv oglasa:</label>
          <input
            type="text"
            id="nazivOglasa"
            value={nazivOglasa}
            onChange={(e) => setNazivOglasa(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cena">Cena:</label>
          <input
            type="number"
            id="cena"
            value={cena}
            onChange={(e) => setCena(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="kolicina">Količina:</label>
          <input
            type="number"
            id="kolicina"
            value={kolicina}
            onChange={(e) => setKolicina(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lokacija">Lokacija:</label>
          <input
            type="text"
            id="lokacija"
            value={lokacija}
            onChange={(e) => setLokacija(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stanje">Stanje:</label>
          <select
            id="stanje"
            value={stanje}
            onChange={(e) => setStanje(e.target.value)}
            required
          >
            <option value="nijeIzabrano">Izaberite stanje</option>
            <option value="0">Novo</option>
            <option value="1">Kao novo - nekorišćeno</option>
            <option value="2">Polovno</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="opis">Opis:</label>
          <textarea
            id="opis"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="slike">Dodaj slike (do 5 slika):</label>

          <div className="dodavanje-slika">
            <button type="button" className="file-input-button" onClick={handleButtonClick}>
              +
              <input type="file" id="slike" className="slike" accept="image/*" multiple onChange={handleChange} />
            </button>

            {slikeIzabrane && <label>Broj izabranih slika: {brIzabranihSlika}</label>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="kategorija">Kategorija:</label>
          <select
              id="kategorija"
              value={odabranaKategorija}
              onChange={e => setOdabranaKategorija(() => {
                handlePoljaKategorije(e.target.value);
                handleOptionsPodkategorije(e.target.value);
                setVrednostiPolja({});
                return e.target.value;
              })}
              required
            >
              <option value="nijeIzabrana">Izaberite kategoriju</option>
              {kategorije.map(kategorija => (
                <option key={kategorija.id} value={kategorija.id}>
                  {kategorija.ime}
                </option>
              ))}
            </select>
        </div>
        
        {odabranaKategorija !== "nijeIzabrana" && (
           <div className="form-group">
             <h3>Popunite polja kategorije!</h3>
             {skupiPoljaKategorije().map(polje => {
              return (
                <div className="form-group" key={polje.naziv}>
                  <label htmlFor={polje.naziv}>{polje.naziv}:</label>
                  <input
                    type={polje.tip}
                    id={polje.naziv}
                    value={polje.vrednost}
                    onChange={(e) => handlePoljeChange(e, polje.naziv)}
                    required
                  />
                </div>
              )
             })}
           </div>
         )}
        
        
        {odabranaKategorija !== "nijeIzabrana" && (
          <div className="form-group">
            <label htmlFor="podkategorija">Podkategorija:</label>
            <select
                id="podkategorija"
                value={odabranaPodkategorija}
                onChange={e => setOdabranaPodkategorija(e.target.value)}
                required
              >
                <option value="nijeIzabrana">Izaberite podkategoriju</option>
                {podkategorije.map(podkategorija => (
                  <option key={podkategorija.id} value={podkategorija.id}>
                    {podkategorija.ime}
                  </option>
                ))}
              </select>
          </div>
        )}
        <div className="dugme-div">
          <button type="submit">Postavi oglas</button>
        </div>
      </form>
    </div>
  );
};

export default PostaviOglas;