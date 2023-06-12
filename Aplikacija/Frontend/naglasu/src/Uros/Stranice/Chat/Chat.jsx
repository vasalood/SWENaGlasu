import React from "react"
import NavBarContext from "../../Contexts/NavBarContext"
import ChatHistoryStavka from "./Komponente/ChatHistoryStavka"
import MessageInputBox from "./Komponente/MessageInputBox"
import MsgItem from "./Komponente/MsgItem"
import UgovorStavka from "./Komponente/UgovorStavka"
import ConnectionContext from "../../Contexts/ConnectionContext"
import BuildChatHubConnection from "../../Utils/ChatHubConnectionBuilder"
import ChatContext from "../../Contexts/ChatContext"
import { useLoaderData } from "react-router"
import { current } from "@reduxjs/toolkit"
import { handleMessageTransaction } from "../../../App"


export async function chatLoader({ params })
{
    const oglasId = params.oglasId
    const strankaId = params.strankaId
    const chatId = params.chatId
    const userState = JSON.parse(localStorage.getItem('userState'))
    const token = localStorage.getItem('token')
    const rootUrl = 'http://localhost:5105/Poruka'

    const requestUrlInbox = `${rootUrl}/VratiInbox/${userState.id}`
    const requestUrlChat= `${rootUrl}/VratiChat/${chatId!=0?chatId:`${oglasId}/${strankaId}`}`
    const inboxPromise = fetch(requestUrlInbox,
        { headers: {"Authorization" : `Bearer ${token}`} 
        
        })

    const chatPromise = (chatId != 0 ||( oglasId !== undefined && strankaId !== undefined))
        ? fetch(requestUrlChat, { headers: { "Authorization": `Bearer ${token}` } }) : null
    const responseInbox = await inboxPromise
    const responseChat = chatPromise!==null?await chatPromise:null
    const returnValue={}
    if (responseInbox.ok)
    {
        const inboxArray = await responseInbox.json()
        
        /**"chatId": 3,
    "naslovnaSlika": "nlGt4gGisoiclkamPu7t.jpg",
    "oglasNaziv": "Automobil",
    "timestamp": 4,
    "strankaUsername": "VELJKO",
    "vlasnikOglasaUsername": "VROS",
    "procitana": true */ //inbox item
        returnValue['inboxItems'] = inboxArray
        
        if (responseChat !== null && responseChat.ok)
        {
            const chatObj = await responseChat.json()
            returnValue['currentChat'] = chatObj
        }
        else
            returnValue['currentChat'] = {
                id:0,poruke:[],zaOglasNaziv:'',zaOglasId:0,receiverUsername:''
            }

        console.log(returnValue)
        return returnValue
    }
    else
    {
        responseInbox.text().then(text=>console.log('Error is '+text))
        throw Error('Bad Request!')
    }
}
export default function Chat() {
    
    const [inputState,setInputState]=React.useState('')
    
    const { navbarSetCollapsable, navbarSetEnabled } = React.useContext(NavBarContext)
    const { chatState, setChatState } = React.useContext(ChatContext)
    
    const loaderData = useLoaderData()
    const userState = JSON.parse(localStorage.getItem('userState'))

    const [ugovorDialogState, setUgovorDialogState] = React.useState(
        {
            opis: '',
            kolicina: '',
            ugovorId:0
        }
    )
    React.useEffect(() =>
    {   
        setChatState(loaderData)
        navbarSetCollapsable(false)
    }, [loaderData])
    const {connectionState,setConnectionState,handleMsgRcv}=React.useContext(ConnectionContext)
   /*  React.useEffect(() =>
    {   
        if (connectionState === null)
            BuildChatHubConnection(setConnectionState,connectionState,handleMsgRcv)

    },[connectionState]) */
    
    const chatHistoryItems = chatState.inboxItems.length !== 0 ?
        chatState.inboxItems.map((item) =>
        {
            console.log(item)
            return <ChatHistoryStavka
                oglasNaziv={item.oglasNaziv}
                oglasSlika={item.naslovnaSlika}
                receiverUsername={item.strankaUsername === userState.username ? item.vlasnikOglasaUsername : item.strankaUsername}
                key={item.chatId}
                chatId={item.chatId} />
        }) : null


    /**"id": 20021,
      "timestamp": 4,
      "chatId": 3,
      "sadrzaj": "string",
      "procitana": true,
      "ugovor": null,
      "posiljaocId": "abcd" */ //poruka

    const chatMsgItems = chatState.currentChat.poruke.length !== 0 ? 
       chatState.currentChat.poruke.map((m =>
        {
            /* if (m.ugovor)
                console.log(m.ugovor) */

            const source = m.posiljaocId===userState.id?0:1
            const timestamp = new Date(m.timestamp)
           
            const content = m.ugovor !== null && m.ugovor !== undefined ? <UgovorStavka
                opis={m.ugovor.opis} kolicina={m.ugovor.kolicina} smer={source}
                key={m.ugovor.id}
                id={m.ugovor.id}
                prihvacen={m.ugovor.prihvacen}
                odbijen={m.ugovor.odbijen}
                ocenjen={m.ugovor.ocenjen} /> : m.sadrzaj

            
            return <MsgItem timestamp={timestamp}
                source={source}
                content={content}
                key={m.id} />
        })): []
    
    
    async function onSubmit(ugovorId)
    {
        /**    public long Timestamp { get; set; }

    public long ChatId{ get; set; }
    public string? Sadrzaj{ get; set;}
    public string PosiljaocId{ get; set; }
    public bool Procitana { get; set; }
    public long? UgovorId{ get; set; }

    public string ReceiverUsername{ get; set; } */ //porukaDto
        if (!inputState&&ugovorId==undefined)
            return
        const token = localStorage.getItem('token')
        const message = {
            timestamp: Date.now(),
            chatId:chatState.currentChat.id,
            receiverUsername: chatState.currentChat.receiverUsername,
            sadrzaj: ugovorId==undefined?inputState:'',
            posiljaocId: userState.id,
            procitana: false,
            ugovorId:ugovorId!=undefined?ugovorId:null
        }
        const sendMsgRes = await fetch('http://localhost:5105/Poruka/PosaljiPoruku',
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(
                    message
                )
            })
        if (sendMsgRes.ok)
        {
            if (ugovorId !=undefined)
            {
                message['ugovor']={id:ugovorId,opis:ugovorDialogState.opis,kolicina:ugovorDialogState.kolicina}
                setUgovorDialogState(
                    {
                        ugovorId: 0,
                        opis: '',
                        kolicina:''
                    }
                )
            }
            else
                setInputState('')
            message["id"] = Number.parseInt(await sendMsgRes.text())
            await connectionState.invoke("SendMessage", JSON.stringify(message));
       
            await handleMessageTransaction(setChatState, message, false)


        }
    }
    return (<div className='w-100 d-flex flex-row hover-overlay overflow-hidden bg-white' style={{height:'calc(100vh - 85.6px)'}}>
        <div className='d-flex flex-column w-25 mh-100 border-right border-left border-secondary overflow-auto'
>
            {chatHistoryItems
            }
        </div>
        <div className='d-flex flex-column w-75'>
            <div className='d-flex flex-row px-3 py-2 border-bottom w-100'>{/*chat header (ime oglasa, korisnika, slika) */}
                <h3 className='font-weight-normal'>
                    {chatState.currentChat.zaOglasNaziv}
                </h3>
            </div>
            <div className='w-100 d-flex flex-column-reverse mh-100 overflow-auto flex-grow-1'>
                {chatMsgItems
                }
            </div>
            <MessageInputBox
                className='mx-3 my-3'
                inputState={inputState}
                setInputState={setInputState}
                onSubmit={onSubmit}
                dialogState={ugovorDialogState}
                setDialogState={setUgovorDialogState}
                oglasId={chatState.currentChat.zaOglasId}
                isVlasnik={chatState.currentChat.zaOglasVlasnikId===userState.id } />
        </div>
    </div>)
}