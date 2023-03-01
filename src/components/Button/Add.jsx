import React from 'react'
import {RiAddFill} from 'react-icons/ri'
import './style.css'
function Add({onClick, title, icon = true}) {
  return (
    <div className='addBtn' onClick={onClick}>
        {title || 'Thêm'} {icon && <RiAddFill style={{marginLeft: '5px', fontSize: '20px'}}/>}
    </div>
  )
}

export default Add