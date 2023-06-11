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
        <label style={{color:"gray"}}></label>
        
       < select value={props.selectedYear} onChange={dropdownChangeHandler}>
       <option value=''>Izaberite Mesec</option>
          <option value='January'>Januar</option>
          <option value='February'>Februar</option>
          <option value='March'>Mart</option>
          <option value='April'>April</option>
          <option value='May'>Maj</option>
          <option value='June'>Jun</option>
          <option value='July'>Jul</option>
          <option value='August'>Avgust</option>
          <option value='September'>Septembar</option>
          <option value='October'>Oktobar</option>
          <option value='November'>Novembar</option>
          <option value='December'>Decembar</option>

        </select>
        </div>
        
      </div>
    </div>
  );
};

export default ExpensesFilterMonth;