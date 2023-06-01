const Payment = () => {
    const handler=(event) => {
        event.preventDefault();
        fetch("http://localhost:5105/CheckoutApi/BePremium",{
            method:"POST",
               
              })
            .then(odg=>(console.log(odg.text())))
        };
    
    return(<div>
       
            <button onClick={handler}>Checkout</button>
       
    </div>)
}
export default Payment;