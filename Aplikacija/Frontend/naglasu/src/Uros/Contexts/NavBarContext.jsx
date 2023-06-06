import React from 'react'


const NavBarContext = React.createContext({
    opacityStyle: 
    {
        opacity:"0"
    },
    navbarSetCollapsable: (value) => { },
    navbarSetEnabled:(value)=>{}

})
export default NavBarContext