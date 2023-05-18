import AuthContext from '../store/auth-context';
import { useRef, useContext } from 'react';
const Test = props =>{
    const authCtx=useContext(AuthContext);
    const usernameInputRef= useRef();
    const handler = (event)=>{
        event.preventDefault();
        console.log(usernameInputRef.current.value);
        fetch("http://localhost:5105/Authentication/PromeniRolu/"+usernameInputRef.current.value, {
            method: "PUT", // HTTP metoda koja se koristi za zahtev
            headers: {
               
              "Content-Type": "application/json", // Tip sadržaja koji se šalje
              "Authorization":`Bearer ${authCtx.token}`
            },
            body: JSON.stringify({
              // Objekat koji se šalje kao sadržaj
              //userName: usernameInputRef.current.value,
             
            }),
          })
          .then(odgovor => odgovor.text())
          .then(odgovorTekst => {
                console.log(odgovorTekst);
          })
          .catch((error) => {
            console.log(error);
          });
    }
   
    return(
    <div className='klasa'>
  <form>
    <h2>Login</h2>
    <div className ="">
      <input type="text" required="required" ref={usernameInputRef}></input>
      <span  >Username</span>
      <i></i>
    </div>
    <div className = "">
    </div>
    <input type = "submit" value="Login" onClick={handler}></input>
  </form>
  </div>
  );
}
export default Test;