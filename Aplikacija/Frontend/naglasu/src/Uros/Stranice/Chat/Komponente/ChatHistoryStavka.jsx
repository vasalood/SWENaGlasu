import placeholder from '../../../Res/Slike/placeholder.jpg'
import { MDBRipple } from 'mdb-react-ui-kit'
import React from 'react'

export default function ChatHistoryStavka({ oglasNaziv, oglasSlika })
{

    const styles = {
        text: {
            //fontFamily: 'Barlow, san-serif',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },
        name: {
            fontWeight: 600,
            fontSize: '1rem',
            color: '#122740',
        },
        caption: {
            fontSize: '0.875rem',
            color: '#758392',
            marginTop: -4,
        }
    }

    return (
    <div className='bg-image hover-overlay w-100' style={{height:'80px',overflow:'visible'}}>
             <div className='w-100 px-3 py-1 d-flex flex-row justify-content-start align-items-center'  style={{height:'80px'}} >
            <img src={
                oglasSlika !== undefined ? `http://localhost:5005/Oglas/VratiSliku/${oglasSlika}` :
                    placeholder} style={{ width: '60px', height: '60px' }}
            className='mr-4 rounded'></img>
            <h4 className='align-self-start mt-1 font-weight-light'>{oglasNaziv}</h4>
            </div>
            <div className='mask' style={{ backgroundColor: 'rgba(145, 145, 145, 0.1)' }}></div>
    </div>
   
          )
}