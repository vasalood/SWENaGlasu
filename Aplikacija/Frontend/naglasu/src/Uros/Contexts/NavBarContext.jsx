import React from 'react'


const NavBarContext = React.createContext({
    opacityStyle: 
    {
        opacity:"1"
    },
    navbarSetCollapsable: (value) => { },
    navbarSetEnabled:(value)=>{}

})
export default NavBarContext