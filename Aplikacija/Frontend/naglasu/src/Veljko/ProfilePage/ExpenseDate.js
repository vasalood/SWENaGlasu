import React from 'react';

import './ExpenseDate.css';

const ExpenseDate = (props) => {
  let month ="" , day ="", year="";
  if(props.datum!=undefined && props.datum!=""){
  month=props.datum.toLocaleString('en-US', { month: 'long' });
   day = props.datum.toLocaleString('en-US', { day: '2-digit' });
   year = props.datum.getFullYear();
  }

  return (
    <div className='expense-date'>
      <div className='expense-date__month'>{month}</div>
      <div className='expense-date__year'>{year}</div>
      <div className='expense-date__day'>{day}</div>
    </div>
  );
};

export default ExpenseDate;