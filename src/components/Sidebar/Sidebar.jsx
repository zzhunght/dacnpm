import React, { useContext, useState } from "react";
import {
  BsGraphDown,
  BsMenuButton,
  BsReceipt,
} from "react-icons/bs";
import { IoAccessibilityOutline, IoHomeOutline, IoMedalOutline, IoReceiptSharp, IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Sidebar.css";

function Sidebar({ children }) {
  const {user, logOut} = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();
  const pathName = location.pathname
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
  ];

  return (
    // <aside className = {cx("wrapper")}>
    <div className="container-sidebar">
      <div  className="sidebar">
        <div className="top-section">
            <div style={{ marginLeft: isOpen ? "50px" : "0" }} className="bars">
              <BsMenuButton onClick={toggle} />
            </div>
        </div>
        <ul className='sidebar-list'>
          {sidebarlist.map((item,index) => (
              <li className={`sidebar-item ${pathName === item.path ? 'active' : ''}`} key={index}>
                  <Link to={item.path}>{item.icon} {item.name}</Link>
              </li>
          ))}
        </ul>

      </div>
      <main>
        <div className="main-head">
          <p className="welcome-dashboard">Xin chào! <span style={{textTransform: 'capitalize'}}>{user.HO} {user.TEN}</span></p>
          <div className="logour-btn" onClick={logOut}>
            Đăng xuất <RiLogoutCircleRLine />
          </div>
        </div>
        <div className="main-container">
          {children}
        </div>
      </main>
    </div>
    // </aside >
  );
}

export default Sidebar;
