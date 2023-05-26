import { useState } from "react";
import bicikla1 from "./Hardkodirani podaci/bicikla1.jpeg";
import bicikla2 from "./Hardkodirani podaci/bicikla2.jpeg";
import bicikla3 from "./Hardkodirani podaci/bicikla3.jpeg";
import bicikla4 from "./Hardkodirani podaci/bicikla4.jpeg";
import bicikla5 from "./Hardkodirani podaci/bicikla5.jpeg";
import data from "./PodaciOglas.json";

export default function Oglas() {

  const nizSlika = [bicikla1, bicikla2, bicikla3, bicikla4, bicikla5]

  const [dugmePrati, setDugmePrati] = useState('Prati oglas');
  const [slika, setSlika] = useState(0);

  function napraviDatum(datumJson) {
    const datum = new Date(datumJson);
    let dan = datum.getDate();
    let mesec = datum.getMonth() + 1;
    const godina = datum.getFullYear();

    if(dan < 10) dan = `0${dan}`;
    if(mesec < 10) mesec = `0${mesec}`;

    return `${dan}.${mesec}.${godina}.`;
  }

  function handleDugmePrati() {
    setDugmePrati(prevDugmePrati => {
      let novo;
      if(prevDugmePrati === 'Prati oglas') {
        novo = `Ukupan broj pratilaca: ${data.brojPregleda}`;
      } else {
        novo = 'Prati oglas';
      }
      return novo;
    })
  }

  function handleSlikaLevo() {
    setSlika(prevSlika => {
      if(prevSlika === 0) return nizSlika.length - 1;
      else return prevSlika - 1;
    })
  }
  
  function handleSlikaDesno() {
    setSlika(prevSlika => {
      if(prevSlika === nizSlika.length - 1) return 0;
      else return prevSlika + 1
    })
  }

  return (
    <>
      <div className="oglas">
        <div className="oglas-header">
          <h1>{data.ime}</h1>
          <button className="button-prvi-tip">Postavi oglas</button>
        </div>
        <hr></hr>
        <div className="oglas-prikaz">
          
          <div className="oglas-slika-div">
            <img src={bicikla1} /*className="oglas-slika"*/ alt=""/>
          </div>

          <div className="oglas-informacije">

            <div className="oglas-informacije-red oglas-informacije-cena">
              <label>Cena:</label>
              <label>{data.cena}</label>
            </div>

            <div className="oglas-informacije-red">
              <label>Kolicina:</label>
              <label>{data.kolicina}</label>
            </div>

            <div className="oglas-informacije-red">
              <label>Datum postavljanja:</label>
              <label>{napraviDatum(data.datumPostavljanja)}</label>
            </div>

            <div className="oglas-informacije-red">
              <label>Stanje:</label>
              <label>{data.stanje}</label>
            </div>

            <div className="oglas-informacije-red">
              <button onClick={handleDugmePrati}>{dugmePrati}</button>
            </div>

          </div>

          <div className="oglas-informacije">

            <div className="oglas-informacije-red">
              <label>Korisnik:</label>
              <label>{data.vlasnikKorisnickoIme}</label>
            </div>

            <div className="oglas-informacije-red">
              <button>Poruka</button>
            </div>
            
            <div className="oglas-informacije-red">
              <label>Lokacija:</label>
              <label>{data.lokacija}</label>
            </div>

            <div className="oglas-informacije-red">
              {/*odakle se racuna ocena?*/}
              <label>Ocena</label>
              <label>4.5</label>
            </div>

            <div className="oglas-informacije-red-ocena">
              <input type="number" min="1" max="5"></input>
              <button className="button-prvi-tip">Oceni</button>
            </div>

          </div>
          
        </div>

        <div className="oglas-pet-slika">

            <button onClick={handleSlikaLevo}> {'<'} </button>
            <img src={nizSlika[slika]} className="oglas-slika" />
            <button onClick={handleSlikaDesno}> {'>'}</button>

        </div>
        
        {/*polja? opis?*/}

      </div>
    </>
  )
}