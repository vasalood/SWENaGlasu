import './ExpenseItem.css';
import ExpenseDate from './ExpenseDate';
function ExpenseItem(props) {
    const dateString = "2023-06-01";
    const date= new Date(dateString);
  return (
    <div className="expense-item">
      <ExpenseDate date={props.date}></ExpenseDate>
      <div className="expense-item__description">
        <h2>
            <h2>Naziv Oglasa: {props.title}</h2>
            <br></br>
            <h2>{props.korisnik} {props.komentar}</h2>
        </h2>
        <div className="expense-item__price">Ocena  {props.amount}</div>
      </div>
      
    </div>
  
  
  );
}

export default ExpenseItem;