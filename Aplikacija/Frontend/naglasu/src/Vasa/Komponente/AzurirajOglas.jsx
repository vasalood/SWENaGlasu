import React, { useState, useEffect, useContext } from "react";
import "./PostaviOglas.css";
import NavBarContext from "../../Uros/Contexts/NavBarContext";
import PopUpModal from '../../Veljko/LoginPage/PopUpModal';
import { useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router";
import './AzurirajOglas.css';
export async function AzurirajOglasLoader({params}) {
    if(params.oglasId == undefined) throw Error('GRESKA');
    const response = await fetch(`http://localhost:5105/Oglas/VratiOglas/${params.oglasId}`);
    
    if(!response.ok) throw Error('Greska!');
    //else console.log('Ucitan oglas');
    const data = await response.json();
  
    return data;
  }
  
const AzurirajOglas = () => {
  let data=localStorage.getItem('userState');
  let parsedData = JSON.parse(data);
  let id = parsedData.id;
  let rola = parsedData.role;
  let token = localStorage.getItem('token');
  const navigate =useNavigate();
  const[errorPop,setErrorPop]=useState();
  const data3 = useLoaderData();
  //state za cuvanje vrednosti inputa naziv oglasa
  //cuva string vrednost
  const [nazivOglasa, setNazivOglasa] = useState(data3.ime);

  //state za cuvanje vrednosti inputa cena
  //cuva string vrednost potrebno parsovati za dobijanje numbera
  const [cena, setCena] = useState(data3.cena);
//state za cuvanje vrednosti inputa kredita
  //cuva string vrednost potrebno parsovati za dobijanje numbera
  const [kredit, setKredit] = useState(data3.kredit);
  //state za cuvanje vrednosti inputa kolicina
  //cuva string vrednost potrebno parsovati za dobijanje numbera
  const [kolicina, setKolicina] = useState(data3.kolicina);
 
  //state za cuvanje vrednosti inputa lokacija
  //cuva string vrednost
  const [lokacija, setLokacija] = useState(data3.lokacija);

  //state za cuvanje vrednosti selectovanog stanja iz select elementa
  //cuva string vrednost potrebno parsovati u number
  const [stanje, setStanje] = useState(data3.stanje);

  const [tipOglasa, setTipOglasa] = useState(data3.tip);
  
    const [smerOglasa, setSmerOglasa] = useState(data3.smer);
  
    const [prikazStanja, setPrikazStanja] = useState(true);
  //state za cuvanje vrednosti textarea opis
  //cuva string vrednost
  const [opis, setOpis] = useState(data3.opis);

  //state za cuvanje vrednosti selectovane kategorije iz select elementa
  //cuva id kategorije u vidu string vrednosti koju je potrebno parsovati u number
  const [odabranaKategorija, setOdabranaKategorija] =  useState(data3.podkategorija.kategorijaId);
  
  //state za cuvanje svih kategorija koje povlacimo sa servera 
  const [kategorije, setKategorije] = useState([]);

  //state za cuvanje slika koje ubacujemo
  //cuva vrednost tipe FileList koji je niz objekata File koji imaju informacije o nazivu slike
  //datumu dodavanja, size, type
  const [files, setFiles] = useState(null);
  
  //state za conditional rendering
  const [slikeIzabrane, setSlikeIzabrane] = useState(true);

  //state za prikaz broja izabranih slika
  const [brIzabranihSlika, setBrIzabranihSlika] = useState(data3.slikeZaSlanje.length);

  //fetch-om vracamo sve kategorije sa servera
  useEffect(() => {
  
    fetch("http://localhost:5105/Kategorija/VratiKategorije")
      .then((response) => response.json())
      .then(data => {
        setKategorije(data);
      })
      .catch((error) => {
        console.error("Greška prilikom dobijanja kategorija:", error);
      });
  }, []);
  const { navbarSetCollapsable } = useContext(NavBarContext)
    React.useEffect(() => {
        
        navbarSetCollapsable(false)
        return ()=>navbarSetCollapsable(true)
    }, [])

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
    //console.log('Nova vrednost je: ' + novaVrednost);
    setVrednostiPolja(prevVrednostiPolja => ({
      ...prevVrednostiPolja,
      [nazivPolja]: novaVrednost
    }));
  };


 
  const [odabranaPodkategorija, setOdabranaPodkategorija] = useState(data3.podkategorija.Id);

  const [podkategorije, setPodkategorije] = useState([]);


  function handleOptionsPodkategorije(id) {
    const kategorijaZaPodkategoriju = kategorije.filter(kategorija => kategorija.id === parseInt(id));
    setPodkategorije(id === 'nijeIzabrana' ? [] : kategorijaZaPodkategoriju[0].podkategorije);
  }

  //hendlujemo ubacivanje slika
  function handleChange(e) {

    if(e.target.files.length > 5) {
      setErrorPop({
        title:"Možete izabrati najviše pet slika"
      });
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();


    formData.append('Ime', nazivOglasa);

    formData.append('Cena', cena);
    formData.append('Kolicina', kolicina);

    formData.append('KorisnikId', id);
    if(files!=null && files!=undefined)


    formData.append('Lokacija', lokacija);
    


    formData.append('Opis', opis);
    
    for (const entry of formData.entries()) { console.log(entry[0], entry[1]); }
      
      
    fetch(`http://localhost:5105/Oglas/AzurirajOglas?oglasId=${data3.id}`, {
        method: 'POST',
            body: formData,
            headers: {
              'Authorization': 'Bearer ' + token 
            }
          })
          .then(s => {
            if (s.ok) {
              navigate(`/oglas/${data3.id}`);
            } else {
              setErrorPop({
                title: "Došlo je do greške prilikom ažuriranja oglasa"
              });
            }
          });
      
     
  };
  //kraj funkcije za prikupljanje podataka iz forme
const errorHandler =()=>{
  setErrorPop(null);
}

  return (
    <div className="postavi-oglas-container abrakadabra">
       {errorPop?<PopUpModal title= {errorPop.title} message={errorPop.message} onConfirm={errorHandler}></PopUpModal>:null}
      <form id="id-postavi-oglas-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label className="labell" htmlFor="nazivOglasa">Naziv oglasa:</label>
          <input
            type="text"
            id="nazivOglasa"
            className="svi-isti input-textarea"
            value={nazivOglasa}
            onChange={(e) => setNazivOglasa(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="labell" htmlFor="cena">Cena:</label>
          <input
            type="number"
            id="cena"
            className="svi-isti input-textarea"
            value={cena}
            onChange={(e) => setCena(e.target.value)}
            required
          />
        </div>
        

        <div className="form-group">
          <label className="labell" htmlFor="kolicina">Količina:</label>
          <input
            type="number"
            id="kolicina"
            className="svi-isti input-textarea"
            value={kolicina}
            onChange={(e) => setKolicina(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="labell" htmlFor="lokacija">Lokacija:</label>
          <input
            type="text"
            id="lokacija"
            className="svi-isti input-textarea"
            value={lokacija}
            onChange={(e) => setLokacija(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="labell" htmlFor="opis">Opis:</label>
          <textarea
            id="opis"
            className="svi-isti input-textarea samo-textarea"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
            required
          />
        </div>

        <div className="dugme-div">
          <button type="submit" className="btn btn-primary">Ažuriraj oglas</button>
        </div>
      </form>
    </div>
  );
};

export default AzurirajOglas;