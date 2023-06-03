import React from 'react';

import './ExpensesFilter.css';

const ExpensesFilterMonth = (props) => {
  const dropdownChangeHandler = (event) => {
   
        props.onChangeFilter(event.target.value);
      
  };


  return (
    <div className='expenses-filter'>
        <div className='expenses-filter__container'>
      <div className='expenses-filter__control'>
        <label style={{color:"gray"}}>Filter by year </label>
        
       < select value={props.selectedYear} onChange={dropdownChangeHandler}>
       <option value=''>Select Month</option>
          <option value='January'>January</option>
          <option value='February'>February</option>
          <option value='March'>March</option>
          <option value='April'>April</option>
          <option value='May'>May</option>
          <option value='June'>June</option>
          <option value='August'>August</option>
          <option value='September'>September</option>
          <option value='October'>October</option>
          <option value='November'>November</option>
          <option value='December'>December</option>

        </select>
        </div>
        
      </div>
    </div>
  );
};

export default ExpensesFilterMonth;