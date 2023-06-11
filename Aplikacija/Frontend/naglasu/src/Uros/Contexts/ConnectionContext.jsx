import React from 'react'


const ConnectionContext = React.createContext(
    {
        connectionState:null,
        setConnectionState: (value) => { },
        handleMsgRcv: () => { },
        handleContractUpdate:()=>{}
    }
)

export default ConnectionContext;