import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './Veljko/LoginPage/Login';
import SignUp from './Veljko/LoginPage/SignUp';
import ConnectionContext from './Uros/Contexts/ConnectionContext';
import React from 'react'
import ChatContext from './Uros/Contexts/ChatContext'


function App({ children }) {
  const [chatState, setChatState] = React.useState(
    {
      currentChat:
      {
          oglasId: null,
          userId:null
      },
      messages: [],
      inboxItems: []
    }
  )

  function handleMsgRcv(user, msg) {
    msg['from'] = user
    setChatState(oldValue => {
      const newState = {}
      newState['inboxItems'] = oldValue.inboxItems.length() != 0 ? oldValue.inboxItems.filter(item => item.from !== user).push(msg) : []
      newState['currentMessages'] = oldValue.currentMessages
      if (oldValue.currentUser === user)
        oldValue.currentMessages.unshift(msg)
      newState['currentUser'] = oldValue.currentUser
      return newState
    })
  }

  const [connectionState, setConnectionState] = React.useState(null)

  return (
    <ConnectionContext.Provider value={{ connectionState, setConnectionState: setConnectionState, handleMsgRcv }}>
      <ChatContext.Provider value={{ chatState, setChatState }}>
        {children}
      </ChatContext.Provider>
    </ConnectionContext.Provider>
  );
}
export default App;