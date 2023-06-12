import React from 'react'

const PaginationContext = React.createContext(
    {
        ukupanBr: 0,
        trenutnaStranica:0
    }
)

export default PaginationContext;