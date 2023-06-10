import React from 'react'

const ChatContext = React.createContext(
    {
        chatState: {
            currentChat:
            {
                id:0,
                zaOglasNaziv: '',
                zaOglasId: 0,
                receiverUsername: '',
                poruke:[]
            },
            inboxItems: []
        },
        setChatState:()=>{}
    }
)

export default ChatContext