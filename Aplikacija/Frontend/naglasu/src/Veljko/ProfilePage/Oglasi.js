import MenuItemm from "./MenuItemm";
import './Oglasi.css';
const Oglasi = (props) =>{
    const oglasList=[
        {
            id:1,
            naslov:"Prvi oglas",
            opis:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!"
        },,
        {
            id:2,
            naslov:"Drugi oglas",
            opis:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!"
        },
        {
            id:3,
            naslov:"Drugi oglas",
            opis:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!"
        },
        {
            id:4,
            naslov:"Drugi oglas",
            opis:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!"
        },
        {
            id:5,
            naslov:"Drugi oglas",
            opis:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!"
        },
        {
            id:5,
            naslov:"Drugi oglas",
            opis:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!"
        },
        {
            id:5,
            naslov:"Drugi oglas",
            opis:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!"
        }
    ];
    return (
        <div className="oglas-container">
          {oglasList.map((oglas) => (
            <MenuItemm key={oglas.id} oglas={oglas} />
          ))}
        </div>
      );
    };

export default Oglasi;