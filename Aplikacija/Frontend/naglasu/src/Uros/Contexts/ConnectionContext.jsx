import React from 'react'


const ConnectionContext = React.createContext(
    {
        connectionState:null,
        setConnectionState: (value) => { },
        handleMsgRcv: () => { },
        handleContractUpdate: () => { },
        setTokenState:()=>{}
    }
)

export default ConnectionContext;