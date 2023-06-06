import ExpenseItem from './ExpenseItem';
import ExpensesFilter from './ExpensesFilter';
import { useState } from 'react';
import Cardd from './Cardd';
import ExpensesFilterMonth from './ExpensesFilterMonth';
function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState('');
  const [filteredMonth, setFilteredMonth] = useState('');

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
    //setFilteredMonth(selectedMonth);
  };
  const filterChangeHandler2 = (selectedMonth) => {
    setFilteredMonth(selectedMonth);
    //setFilteredMonth(selectedMonth);
  };
const filteredExpenses = props.items.filter(expense =>{
  const expenseYear = expense.date.getFullYear().toString();
  const expenseMonth = expense.date.toLocaleString('en-US', { month: 'long' }); //  const month = props.date.toLocaleString('en-US', { month: 'long' });
  console.log(expenseYear);
  console.log(expenseMonth);
  return (
    (filteredYear === '' || expenseYear === filteredYear) &&
    (filteredMonth === '' || expenseMonth === filteredMonth)
  );
})
  return (
    <div>
      <Cardd className ='expenses'>
        <div className="expenses-filter__container">
      <ExpensesFilter selectedYear={filteredYear}  onChangeFilter={filterChangeHandler} />
      <ExpensesFilterMonth selectedMonth={filteredMonth}  onChangeFilter={filterChangeHandler2} />
      </div>
     {filteredExpenses.map((expense)=>(<ExpenseItem title={expense.title} amount ={expense.amount} date={expense.date}korisnik={expense.korisnik} komentar={expense.komentar}/>))}
      </Cardd>
    </div>
  );
}

export default Expenses;