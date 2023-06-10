import placeholder from '../../../Res/Slike/placeholder.jpg'
import { MDBRipple } from 'mdb-react-ui-kit'
import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function ChatHistoryStavka({ oglasNaziv, oglasSlika,receiverUsername,chatId})
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
        <div className='w-100' style={{ height: '80px', overflow: 'visible' }}>
            <Link to ={'http://localhost:3000/chat/'+chatId}>
            <Button className='w-100 text-dark'>
            <div className='w-100 px-3 py-1 d-flex flex-row justify-content-start align-items-center'  style={{height:'80px'}} >
            <img src={
                oglasSlika != '' &&oglasSlika!=null&&oglasSlika!=undefined? `http://localhost:5105/Oglas/VratiSliku/${oglasSlika}` :
                    placeholder} style={{ width: '60px', height: '60px' }}
            className='mr-4 rounded'></img>
                <h4 className='align-self-start mt-1 font-weight-light'>{receiverUsername}</h4>
                    <h5 className=
                        'align-self-end mt-1 mb-0 font-weight-light text-truncate'>
                        {oglasNaziv}</h5>
            </div>
            {/* <div className='mask' style={{ backgroundColor: 'rgba(145, 145, 145, 0.1)' }}></div> */}
            </Button>
            </Link>
           

    </div>
   
          )
}