import './ExpensesFilter.css';
const ExpensesSelect = () =>{
    return (
        <div className='expenses-filter'>
            <div className='expenses-filter__container'>
          <div className='expenses-filter__control'>
            <label style={{color:"gray"}}></label>
            
           < select value={props.selectedMonth} onChange={dropdownChangeHandler}>
           <option value='SviUgovori'>SviUgovori</option>
           <option value='Kupac'>Kupac</option>
              <option value='Prodavac'>Prodavac</option>
            </select>
            </div>
            
          </div>
        </div>)
}
export default ExpensesSelect;