import React from "react"
import NavBarContext from "../../Contexts/NavBarContext"
import ChatHistoryStavka from "./Komponente/ChatHistoryStavka"
import MessageInputBox from "./Komponente/MessageInputBox"
import MsgItem from "./Komponente/MsgItem"
import UgovorStavka from "./Komponente/UgovorStavka"

export default function Chat({ nazivOglasa, slikaOglasa, idKorisnika, idKorisnika2, usernameKorisnika2 }) {
    
    const chatHistoryStavkeTest = []
    for (let i = 0; i != 20; ++i) {
        chatHistoryStavkeTest.push('oglas' + i)
    }
    const mDate = new Date(Date.now())
    const fakeMsgTmplt = { source: 0, timestamp: mDate.toUTCString(), content: 'aaaaaaaaaaaaa' }
    const fakeMsgs = []
    for (let i = 0; i != 15; ++i)
        fakeMsgs.push(fakeMsgTmplt)
    const fakeMsgItems = fakeMsgs.map((msg, i) => {
        return <MsgItem source={((i / 2) >> 0) % 2} timestamp={msg.timestamp} content={msg.content} />
    })
    const chatHistoryStavke = chatHistoryStavkeTest.map(ime => {
        return <ChatHistoryStavka oglasNaziv={ime} />
    })
    const { navbarSetCollapsable, navbarSetEnabled } = React.useContext(NavBarContext)
    const ugovorStavka = <UgovorStavka opis='Hteo bih da narucim ovoj projzvod' kolicina={3} smer={1} />
    fakeMsgItems.unshift(<MsgItem source={1} timestamp={''} content={ugovorStavka} />)
    React.useEffect(() =>
    {
        navbarSetCollapsable(false)
        //navbarSetEnabled(false)
    },[])
    return (<div className='w-100 d-flex flex-row hover-overlay overflow-hidden' style={{height:'calc(100vh - 85.6px)'}}>
        <div className='d-flex flex-column w-25 mh-100 border-right border-left border-secondary overflow-auto'
>
            {chatHistoryStavke}
        </div>
        <div className='d-flex flex-column w-75'>
            <div className='d-flex flex-row px-3 py-2 border-bottom w-100'>{/*chat header (ime oglasa, korisnika, slika) */}
                <h3 className='font-weight-normal'>
                    Naziv oglasa
                </h3>
            </div>
            <div className='w-100 d-flex flex-column-reverse mh-100 overflow-auto'>
                {fakeMsgItems}
            </div>
            <MessageInputBox  className='mx-3 my-3'/>
        </div>
    </div>)
}