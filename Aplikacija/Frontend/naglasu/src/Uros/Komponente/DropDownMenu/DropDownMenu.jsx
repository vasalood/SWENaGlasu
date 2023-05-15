import "./DropDownMenu.css"
import React from 'react'


export default function DropDownMenu({
    className,
    ButtonIconOn,
    ButtonIconOff,
    items,
    isSelected,
    toggleSelected,
    buttonDisabled}) {
    const itemsToRender = items.map((i,it) => {

        
        return <li className="dropDownMenu--item" key={it}>{
            React.cloneElement(i,[className="dropDownMenu--item_content"])
        }</li>
    }
    )
    
    

    return (
        <div className="dropDownMenu" onMouseEnter={(ev) => {
            !buttonDisabled&&toggleSelected(true)
        }}
        onMouseLeave={(ev) => {
            !buttonDisabled&&toggleSelected(false)
        }}>
            {isSelected?ButtonIconOn:ButtonIconOff}
            {isSelected&&<div className={"dropDownMenu--container " + className} >
                <ul>
                    {itemsToRender}
                </ul>
            </div>}
        </div>
       
    )
}