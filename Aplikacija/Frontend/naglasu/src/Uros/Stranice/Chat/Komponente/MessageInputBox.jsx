import React from 'react'
import { BsSend } from 'react-icons/bs'
import { FaFileContract } from 'react-icons/fa' 
import Button from '@mui/material/Button';
import AddUgovorDialog from './AddUgovorDialog';
export default function MessageInputBox({className,inputState,setInputState,onSubmit,dialogState,setDialogState,oglasId})
{
    const inputRef = React.useRef(null)
    function enterHandler(ev)
    {
        if (ev.key === 'Enter')
        {
            //console.log("IT WORKS")
            //onSubmit()
        }
            
    }
    React.useEffect(() =>
    {
        inputRef.current.addEventListener('keypress', enterHandler)
        
    },[inputRef.current])
    return (
        <div className={'p-2 d-flex flex-row justify-content-center align-items-center w-100' + className !== undefined ?
    className:''}>{/*container */}
            <div className='p-1 w-100 d-flex flex-row justify-content-center border bg-white align-items-center'
                style={{ height: '46px', borderRadius: '15px' }}>{/**wrapper */}
                <input ref={inputRef} className='w-100 border-0' style={{ fontSize: 'large', height: '30px', outline: 'none' }}
                value={inputState} onChange={(ev)=>setInputState(ev.target.value)}>
                
                </input>
                <AddUgovorDialog onSubmit={onSubmit} dialogState={dialogState} setDialogState={setDialogState} oglasId={oglasId} />
              {/*   <Button className='border-0 bg-white' style={{outline: 'none !important',boxShadow: 'none !important'}}>
                    <FaFileContract size={30} />
                </Button> */}
                <Button className='border-0 bg-white' style={{ outline: 'none !important', boxShadow: 'none !important' }}
                    onClick={ev=> onSubmit()}>
                    <BsSend size ={30}/>
                </Button>
            </div>
        </div>)
}