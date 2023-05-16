import bicikla1 from "./Hardkodirani podaci/bicikla1.jpeg";
import bicikla2 from "./Hardkodirani podaci/bicikla2.jpeg";
import bicikla3 from "./Hardkodirani podaci/bicikla3.jpeg";
import bicikla4 from "./Hardkodirani podaci/bicikla4.jpeg";
import bicikla5 from "./Hardkodirani podaci/bicikla5.jpeg";


export default function Oglas() {

  const nizSlika = [bicikla1, bicikla2, bicikla3, bicikla4, bicikla5]

  return (
    <>
      <div className="oglas">
        <div className="oglas-header">
          <h1>Bicikla na prodaju</h1>
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
              <label>3000</label>
            </div>

            <div className="oglas-informacije-red">
              <label>Kolicina:</label>
              <label>1</label>
            </div>

            <div className="oglas-informacije-red">
              <label>Datum postavljanja:</label>
              <label>10.12.2022.</label>
            </div>

            <div className="oglas-informacije-red">
              <label>Stanje:</label>
              <label>Polovno</label>
            </div>

            <div className="oglas-informacije-red">
              <button>Prati oglas</button>
            </div>

          </div>

          <div className="oglas-informacije">

            <div className="oglas-informacije-red">
              <label>Korisnik:</label>
              <label>Milovan</label>
            </div>

            <div className="oglas-informacije-red">
              <button>Poruka</button>
            </div>
            
            <div className="oglas-informacije-red">
              <label>Lokacija:</label>
              <label>Nis</label>
            </div>

            <div className="oglas-informacije-red">
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

            <button> {'<'} </button>
            <img src={nizSlika[0]} className="oglas-slika" />
            <button> {'>'}</button>

        </div>
      </div>
    </>
  )
}