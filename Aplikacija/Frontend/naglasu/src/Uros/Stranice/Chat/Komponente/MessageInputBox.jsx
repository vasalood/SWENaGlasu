import React from 'react'
import { BsSend } from 'react-icons/bs'
import { FaFileContract } from 'react-icons/fa' 
import Button from '@mui/material/Button';
export default function MessageInputBox({className})
{
    
    return (
        <div className={'p-2 d-flex flex-row justify-content-center align-items-center w-100' + className !== undefined ?
    className:''}>{/*container */}
            <div className='p-1 w-100 d-flex flex-row justify-content-center border bg-white align-items-center'
                style={{ height: '46px',borderRadius:'15px' }}>{/**wrapper */}
                <input className='w-100 border-0' style={{ fontSize: 'large', height: '30px', outline:'none'}}>
                
                </input>
                <Button className='border-0 bg-white' style={{outline: 'none !important',boxShadow: 'none !important'}}>
                    <FaFileContract size={30} />
                </Button>
                <Button className='border-0 bg-white' style={{outline: 'none !important',boxShadow: 'none !important'}}>
                    <BsSend size ={30}/>
                </Button>
            </div>
        </div>)
}