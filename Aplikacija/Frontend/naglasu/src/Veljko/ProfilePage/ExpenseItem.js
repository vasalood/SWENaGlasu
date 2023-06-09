import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';
import { Link } from 'react-router-dom';
function ExpenseItem(props) {
    const dateString = "2023-06-01";
    const date= new Date(dateString);
  return (
    <div className="expense-item">
      <ExpenseDate datum={props.datum}></ExpenseDate>
      <div className="expense-item__description">
        <h2>
            <h2>Naziv Oglasa: {props.title}</h2>
            <br></br>
            <h2> <Link to={`/profil/${props.korisnik}`}>{props.korisnik} </Link>{props.komentar}</h2>
        </h2>
        <div className="expense-item__price">Ocena  {props.amount}</div>
      </div>
      
    </div>
  
  
  );
}

export default ExpenseItem;