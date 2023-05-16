export default function DropDown({ active,children,className })
{
    return (
        active&&<div className='dropDown'>
            <div className={`dropDown--container ` + className != null && className != undefined ?
                    className:''}>
                        {children}
                    </div>
                </div>
    )
}