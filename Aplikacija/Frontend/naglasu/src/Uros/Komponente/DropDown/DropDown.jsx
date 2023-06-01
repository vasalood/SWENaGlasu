import './DropDown.css'

export default function DropDown({ active, children, id,containerId,setActive })
{
    return (
        active && <div className='dropDown' id={id != undefined && id != null ? id : ""} onClick={(ev) =>
            {
                //if(setActive !== undefined) 
                    //setActive(oldValue=>!oldValue)
            }
        }>
            <div className='dropDown--container' id={id!=undefined&&id!=null?containerId:""}>
                        {children}
                    </div>
                </div>
    )
}