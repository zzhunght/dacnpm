import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { FiUser, FiUserCheck } from "react-icons/fi";
import {BsFileText} from 'react-icons/bs'
import "./Home.css";
import { IoSettingsOutline } from "react-icons/io5";
import axiosInstance from "../../utils/axiosConfig";
import Table from "../Table/Table";

const Customercolumns = [
  {
    Header: "ID",
    accessor: "MAKH",
  },
  {
    Header: "Tên",
    accessor: "TEN",
  },
  {
    Header: "Họ",
    accessor: "HO",
  }
];

const Accessorycolumns = [
  {
    Header: "Mã LKDV",
    accessor: "MALKDV"
  },
  {
    Header: "Tên",
    accessor: "TENLKDV",
  },
  {
    Header: "Giá",
    accessor: "GIA",
  },
];
function Home() {
  const [search, setSearch] = useState("");
  const [customer,setCustomer] = useState([])
  const [accessory,setAccessory] = useState([])

  useEffect(()=>{
    const getdata = async() =>{
      const res = await axiosInstance.get('/accessory')
      const res2 = await axiosInstance.get('/customer')
      const data = res.data
      const data2 = res2.data
      setAccessory(data.items)
      setCustomer(data2.items)
    }
    getdata()
  },[])

  return (
    <div>
      <Row gutter={[16]}>
        <Col xl={6}>
          <div className="widget">
            <div className="widget-content">
              <h4>100</h4>
              <h5>Khách hàng</h5>
            </div>
            <div className="widget-img">
              <FiUser className="widget-icon"/>
            </div>
          </div>
        </Col>
        <Col xl={6}>
          <div className="widget widget-2">
            <div className="widget-content">
              <h4>13</h4>
              <h5>Nhân viên</h5>
            </div>
            <div className="widget-img">
              <FiUserCheck className="widget-icon"/>
            </div>
          </div>
        </Col>
        <Col xl={6}>
          <div className="widget widget-3">
            <div className="widget-content">
              <h4>134</h4>
              <h5>Linh kiện và dịch vụ</h5>
            </div>
            <div className="widget-img">
              <IoSettingsOutline className="widget-icon"/>
            </div>
          </div>
        </Col>
        <Col xl={6}>
          <div className="widget widget-4">
            <div className="widget-content">
              <h4>2312</h4>
              <h5>Phiếu bảo hành</h5>
            </div>
            <div className="widget-img">
              <BsFileText className="widget-icon"/>
            </div>
          </div>
        </Col>
      </Row>

      <Row gutter={[16]}>
        <Col xl={12}>
        </Col>
        <Col xl={12}>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
