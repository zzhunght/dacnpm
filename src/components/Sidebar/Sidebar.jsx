import React from 'react'
import {BsCalendarDate} from 'react-icons/bs'
import {IoSettingsOutline} from 'react-icons/io5'

import './Sidebar.css'
function Sidebar() {

    const sidebarlist = [
        {
            name: 'Lịch',
            path: '/calendar',
            icon: <BsCalendarDate className="sidebar-icon" />
        },
        {
            name: 'Thiết bị',
            path: '/product',
            icon: <IoSettingsOutline className="sidebar-icon" />
        },
        {
            name: 'Lịch',
            path: '/calendar',
            icon: <BsCalendarDate className="sidebar-icon" />
        },
        {
            name: 'Thiết bị',
            path: '/product',
            icon: <IoSettingsOutline className="sidebar-icon" />
        },
        {
            name: 'Lịch',
            path: '/calendar',
            icon: <BsCalendarDate className="sidebar-icon" />
        },
        {
            name: 'Thiết bị',
            path: '/product',
            icon: <IoSettingsOutline className="sidebar-icon" />
        }
    ]


  return (
    <div className='sidebar-wr'>
        <ul className='sidebar-list'>
            {sidebarlist.map((item,index) => (
                <li className={`sidebar-item ${index === 1 ? 'active' : ''}`} key={index}>
                    {item.icon} {item.name}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Sidebar