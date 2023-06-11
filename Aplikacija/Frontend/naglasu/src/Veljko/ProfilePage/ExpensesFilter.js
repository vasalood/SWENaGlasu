import React from 'react';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {
  const dropdownChangeHandler = (event) => {
   
        props.onChangeFilter(event.target.value);
      
  };
  const monthDropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className='expenses-filter'>
        <div className='expenses-filter__container'>
      <div className='expenses-filter__control'>
        <label style={{color:"gray"}}></label>
        
       < select value={props.selectedMonth} onChange={dropdownChangeHandler}>
       <option value=''>Izaberite godinu</option>
       <option value='2023'>2023</option>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
          <option value='2019'>2019</option>
        </select>
        </div>
        
      </div>
    </div>
  );
};

export default ExpensesFilter;