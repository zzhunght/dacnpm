import React, { useState } from "react";
import {
  BsCalendarDate,
  BsFillHddNetworkFill,
  BsGraphDown,
  BsMenuButton,
  BsReceipt,
} from "react-icons/bs";
import { IoAccessibilityOutline, IoHomeOutline, IoMedalOutline, IoReceiptSharp, IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.css";

function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const sidebarlist = [
    {
      name: "Trang chủ",
      path: "/",
      icon: <IoHomeOutline className="sidebar-icon" />,
    },
    {
      name: "Linh kiện",
      path: "/accessory",
      icon: <IoSettingsOutline className="sidebar-icon" />,
    },
    
    {
      name: "Nhân viên",
      path: "/staff",
      icon: <IoAccessibilityOutline className="sidebar-icon" />,
    },
    {
      name: "Khách hàng",
      path: "/customer",
      icon: <IoAccessibilityOutline className="sidebar-icon" />,
    },
    {
      name: "Thống kê",
      path: "/statistical",
      icon: <BsGraphDown className="sidebar-icon" />,
    },
    {
      name: "Phiếu nhận xe",
      path: "/carreceipt",
      icon: <BsReceipt className="sidebar-icon" />,
    },
    {
      name: "Phiếu trả xe",
      path: "/pay",
      icon: <BsReceipt className="sidebar-icon" />,
    },
    {
      name: "Khuyến mãi",
      path: "/promotion",
      icon: <IoReceiptSharp className="sidebar-icon" />,
    },
    // {
    //   name: "Lịch",
    //   path: "/calendar",
    //   icon: <BsCalendarDate className="sidebar-icon" />,
    // },
    // {
    //   name: "Thiết bị",
    //   path: "/product",
    //   icon: <IoSettingsOutline className="sidebar-icon" />,
    // },
  ];

  return (
    // <aside className = {cx("wrapper")}>
    <div className="container-sidebar">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        {/* <ul className='sidebar-list'>
                    {sidebarlist.map((item,index) => (
                        <li className={`sidebar-item ${index === 1 ? 'active' : ''}`} key={index}>
                            {item.icon} {item.name}
                        </li>
                    ))}
                </ul> */}
        <div className="top-section">
          
          <div style={{ marginLeft: isOpen ? "50px" : "0" }} className="bars">
            <BsMenuButton onClick={toggle} />
          </div>
        </div>
        {/* <ul className='sidebar-list'> */}
        {sidebarlist.map((item, index) => (
          <NavLink
            to={item.path}
            key={item.index}
            // className={`sidebar-item ${index === item.path ? 'active' : ''}`} key={index}
            className="link"
            activeClassName="active"
          >
            {/* <li className={`sidebar-item ${index === 1 ? 'active' : ''}`} key={index}> */}
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link-text"
            >
              {item.name}
            </div>

            {/* </li> */}
          </NavLink>
        ))}
        {/* </ul > */}
      </div>
      <main>{children}</main>
    </div>
    // </aside >
  );
}

export default Sidebar;
