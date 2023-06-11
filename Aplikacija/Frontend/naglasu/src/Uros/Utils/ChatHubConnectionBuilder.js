import * as SignalR from '@microsoft/signalr'
import { useLocation } from 'react-router-dom'
import React from 'react'

export default function BuildChatHubConnection(setConnectionState, connectionState,handleMsgRcv,handleContractUpdate)
{
    const token = localStorage.getItem('token')
    const userState = localStorage.getItem('userState')
    if (userState !== undefined && userState !== null && userState !== '') {
        const signalRConnection = new SignalR.HubConnectionBuilder()
            .withUrl('http://localhost:5105/chatHub',
                {
                    accessTokenFactory: () => localStorage.getItem('token')
                })
            .withAutomaticReconnect().build()
        signalRConnection.on("ReceiveMessage", (username, message) => {
            handleMsgRcv(username, message)
        })
       // signalRConnection.on("Test", (msg) => alert(msg))
        
        //signalRConnection.on("ReceiveMessageTest",(msg)=>alert(msg))

        signalRConnection.on('UpdateContract', (id, value) =>
        {
            handleContractUpdate(id,value)
        })
        
        setConnectionState(signalRConnection)

        signalRConnection.start()
    }
}