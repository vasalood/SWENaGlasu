import React from 'react'

export default function MsgItem({source,timestamp,content})
{
    const bgColor = source === 0 ? 'bg-primary' : 'bg-light'
    const textColor = source === 0 ? 'text-light' : 'text-dark'
    const alignment = source===0?'align-self-end':'align-self-start'
    return (
        <div className='px-2 w-100 mw-100 bg-white d-flex flex-column' >
            <p className={'mb-1 text-muted '+alignment} style={{fontSize:'small'}}>{timestamp}</p>
            <div className={'p-2 ' + bgColor + ' ' + textColor + ' ' + ' ' + alignment}
                style={{ fontSize: 'large', borderRadius: '15px',maxWidth:'40%',overflowWrap:'break-word' }}>
                {content}</div>
        </div>)
}