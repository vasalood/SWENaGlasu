import React, {useState} from 'react';
const AuthContext = React.createContext({
    token: '',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{},
});
export const AuthContextProvider = (props)=>{
    const[token,setToken]=useState(null);
    const userIsLoggedIn = !!token; // u boolean,''=>false, 'nesto'=>true
    
    const loginHandler = (token)=>{
        setToken(token);
    }
    const logoutHandler = ()=>{
        setToken(null);
    }
    const contextValue = {
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }
    return <AuthContext.Provider value ={contextValue}>{props.children}</AuthContext.Provider> //odgovoran za upravljanje kontekstom 
}
export default AuthContext;  