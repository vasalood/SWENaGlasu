import React from 'react';

import './ExpensesFilter.css';

const ExpensesFilterMark = (props) => {
  const dropdownChangeHandler = (event) => {
        props.onChangeFilter(event.target.value);
    
  };


  return (
    <div className='expenses-filter'>
        <div className='expenses-filter__container'>
      <div className='expenses-filter__control'>
        <label style={{color:"gray"}}>Filter ocene</label>
        
       < select value={props.selectedMark} onChange={dropdownChangeHandler}>
       <option value=''>Izaberite Ocenu</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
        </div>
        
      </div>
    </div>
  );
};
export default ExpensesFilterMark;