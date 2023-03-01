import React from 'react'
import {IoTrashOutline} from 'react-icons/io5'

function Delete({onClick, disabled}) {
  return (
    <div className={`deleteBtn ${disabled ? 'disabled' : ''}`} onClick={onClick}>
        Xoá <IoTrashOutline style={{marginLeft: '5px', fontSize: '20px'}}/>
    </div>
  )
}

export default Delete