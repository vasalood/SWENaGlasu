import React from 'react'


const NavBarContext = React.createContext({
    opacityStyle: 
    {
        opacity:"1"
    },
    isDropdownSelected: false,
    setDropdownSelected: (oldValue) => { return null },

})
export default NavBarContext