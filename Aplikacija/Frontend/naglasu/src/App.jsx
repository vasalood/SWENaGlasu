import logo from './logo.svg';
import './App.css';
import { Fragment } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './Veljko/LoginPage/Login';
import SignUp from './Veljko/LoginPage/SignUp';
import ConnectionContext from './Uros/Contexts/ConnectionContext';
import React from 'react'
import ChatContext from './Uros/Contexts/ChatContext'
import BuildChatHubConnection from './Uros/Utils/ChatHubConnectionBuilder';

export async function handleMessageTransaction(setChatState, message,forRecv)
{
    const newInboxItemRes = await fetch('http://localhost:5105/Poruka/VratiNaslovnuPoruku/' + message.chatId)
    if (!newInboxItemRes.ok)
          throw Error("Doslo je do greske.")
    const newInboxItem = await newInboxItemRes.json()
    setChatState(oldValue =>
    {
      const newInboxItems = oldValue.inboxItems.filter(item => item.chatId !== message.chatId)
      newInboxItems.unshift(newInboxItem) 
      if (oldValue.currentChat.id === message.chatId)
      {

        const newPoruke = oldValue.currentChat.poruke
        newPoruke.unshift(message)
        return {
              ...oldValue,
              inboxItems: newInboxItems, 
              currentChat:
              {
                  ...oldValue.currentChat,
                  poruke:newPoruke
              }
              }
      }
      return {
        ...oldValue,
        inboxItems: newInboxItems, 
      }
      
    })
}

function App({ children }) {
  const [tokenState,setTokenState]=React.useState('')
  const [chatState, setChatState] = React.useState(
    {
      currentChat:
      {
        id:0,
        zaOglasNaziv: '',
        zaOglasId: 0,
        receiverUsername: '',
        poruke:[]
      },
      inboxItems: []
    }
  )

  function handleMsgRcv(user, msgJSON) {
    const msg = JSON.parse(msgJSON)
    handleMessageTransaction(setChatState, msg, true)
  }

  function handleContractUpdate(id, value)
  {
      chatState.poruke.filter(m=>m.ugovor!=undefined&&m.ugovor.id===id)
  }

  const [connectionState, setConnectionState] = React.useState(null)

  React.useEffect(() =>
  {   
    const token = localStorage.getItem('token')
    if (connectionState === null && token!=null)
    {
      console.log('connected with token: '+token)
      BuildChatHubConnection(setConnectionState,connectionState,handleMsgRcv,handleContractUpdate)
    }
          

  }, [connectionState])
  function reRenderApp() {
    window.location.reload();
  }
  return (
    <ConnectionContext.Provider value={{
      connectionState,
      setConnectionState: setConnectionState,
      handleMsgRcv, handleContractUpdate,setTokenState:reRenderApp
    }}>
      <ChatContext.Provider value={{ chatState, setChatState }}>
        {children}
      </ChatContext.Provider>
    </ConnectionContext.Provider>
  );
}
export default App;