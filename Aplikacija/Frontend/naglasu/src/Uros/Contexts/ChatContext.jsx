import React from 'react'

const ChatContext = React.createContext(
    {
        chatState: {
            currentChat:
            {
                oglasId: null,
                userId:null
            },
            messages: [],
            inboxItems: []
        },
        setChatState:()=>{}
    }
)

export default ChatContext