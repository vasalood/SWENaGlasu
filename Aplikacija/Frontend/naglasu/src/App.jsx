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
        console.log('how many times')
        console.trace()
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
    //console.log('here')
      setChatState(oldValue =>
      {
        const messageOfInterest = oldValue.currentChat.poruke.filter(p => p.ugovor != undefined && p.ugovor.id === id)[0]
        if (messageOfInterest != undefined)
        {
          const newMessage = { ...messageOfInterest, ugovor: { ...messageOfInterest.ugovor } }
          if (value)
          {
            newMessage.ugovor['prihvacen'] = true
            newMessage.ugovor['odbijen']=false
          }
          else
          {
            newMessage.ugovor['odbijen'] = true
            newMessage.ugovor['prihvacen']=false
          }
          return {
            ...oldValue,
            currentChat:{
              ...oldValue.currentChat,
              poruke: oldValue.currentChat.poruke.map(p =>
              {
                if (p.ugovor == null || p.ugovor.id !== id)
                  return p
                else
                  return newMessage
                })
            }
          }
        }
        return oldValue
      })
  }

  const [connectionState, setConnectionState] = React.useState(null)

  React.useEffect(() =>
  {   
    const userState = localStorage.getItem('userState')
    if ((connectionState == null||connectionState.disconnected) && userState!=undefined)
    {
      console.log('connected user: ' +userState)
      BuildChatHubConnection(setConnectionState,connectionState,handleMsgRcv,handleContractUpdate)
    }
          

  }, [connectionState])

  return (
    <ConnectionContext.Provider value={{
      connectionState,
      setConnectionState: setConnectionState,
      handleMsgRcv, handleContractUpdate
    }}>
      <ChatContext.Provider value={{ chatState, setChatState }}>
        {children}
      </ChatContext.Provider>
    </ConnectionContext.Provider>
  );
}
export default App;