import ExpenseItem from './ExpenseItem';
import ExpensesFilter from './ExpensesFilter';
import { useState,useEffect } from 'react';
import Cardd from './Cardd';
import ExpensesFilterMonth from './ExpensesFilterMonth';
import ExpensesFilterMark from './ExpensesFilterMark';
function Expenses(props) {
  console.log(props.items);

  
  const [filteredYear, setFilteredYear] = useState('');
  const [filteredMonth, setFilteredMonth] = useState('');
  const [filteredMark, setFilteredMark] = useState('');
  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
    //setFilteredMonth(selectedMonth);
  };
  const filterChangeHandler2 = (selectedMonth) => {
    setFilteredMonth(selectedMonth);
    //setFilteredMonth(selectedMonth);
  };
  const filterChangeHandler3 = (selectedMark) => {
    setFilteredMark(selectedMark);
    //setFilteredMonth(selectedMonth);
  };
const filteredExpenses = props.items.filter(expense =>{
  const expenseMark = expense.vrednost;
  let expenseYear="";
  let expenseMonth="";
  if(expense.datum!=undefined)
   expenseYear = expense.datum.getFullYear().toString();
   if(expense.datum!=undefined)
   expenseMonth = expense.datum.toLocaleString('en-US', { month: 'long' });
  console.log(expenseYear);
  console.log(expenseMonth);
  console.log(expenseMark);
  console.log(filteredMark);
  if(expenseMark===filteredMark)
  console.log("ABE");
  return (
    (filteredYear === '' || expenseYear === filteredYear) &&
    (filteredMonth === '' || expenseMonth === filteredMonth) &&
    (filteredMark === '' || expenseMark == filteredMark)
  );
})
  return (
    <div>
        <h1 style={{ marginBottom: '1rem', fontSize: '3rem', fontWeight: '800', color: '#333333', lineHeight: '1' }}>
  <span style={{ background: 'linear-gradient(to right, #3B82F6, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dobijene</span> Ocene
</h1>
<p style={{ fontSize: '1.5rem', fontWeight: 'normal', color: '#888888', lineHeight: '1.2' }}>

Ocene koje dobijate imaju značajan uticaj na poverenje koje će budući kupci imati.
</p>
      <Cardd className ='expenses'>
        <div className="expenses-filter__container">
      <ExpensesFilter selectedYear={filteredYear}  onChangeFilter={filterChangeHandler} />
      <ExpensesFilterMonth selectedMonth={filteredMonth}  onChangeFilter={filterChangeHandler2} />
      <ExpensesFilterMark selectedMark={filteredMark}  onChangeFilter={filterChangeHandler3} />
      </div>
     {filteredExpenses.map((expense)=>(<ExpenseItem title={expense.oglasIme} amount ={expense.vrednost} datum={expense.datum}korisnik={expense.username} komentar={expense.komentar}/>))}
      </Cardd>
    </div>
  );
}

export default Expenses;