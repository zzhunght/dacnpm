import {
  faCircleXmark,
  faFloppyDisk,
  faMagnifyingGlass,
  faPenToSquare,
  faSpinner,
  faTrashCan,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Staff.css";
const rawData = [
  {
    id: 1,
    firstName: "A",
    lastName: "Nguyen",
    phone: "01234567",
    address: "97 man thiện, hiệp phú",
    date: "12/12/12",
    male: "nữ",
    email: "12@gmail.com",
  },
  {
    id: 2,
    firstName: "A",
    lastName: "Nguyen",
    phone: "01234567",
    address: "97 man thiện, hiệp phú",
    date: "12/12/12",
    male: "nữ",
    email: "12@gmail.com",
  },
  {
    id: 3,
    firstName: "A",
    lastName: "Nguyen",
    phone: "01234567",
    address: "97 man thiện, hiệp phú",
    date: "12/12/12",
    male: "nữ",
    email: "12@gmail.com",
  },
  {
    id: 4,
    firstName: "B",
    lastName: "Nguyen Nguyen",
    phone: "01234567",
    address: "97 man thiện, hiệp phú",
    date: "12/12/12",
    male: "nữ",
    email: "12@gmail.com",
  },
  {
    id: 5,
    firstName: "A",
    lastName: "Nguyen",
    phone: "01234567",
    address: "97 man thiện, hiệp phú",
    date: "12/12/12",
    male: "nữ",
    email: "12@gmail.com",
  },
];
function Staff() {
  const [tableData, setTableData] = useState(rawData);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updateSate, setUpdateState] = useState(-1);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div>
      <div className="search-header">
        <div className="header-receipt-container">
          <h4 className="header-receipt-name">DANH SÁCH NHÂN VIÊN</h4>
          <Link className="add-receipt" to="/addCarReceipt">Thêm nhân viên</Link>
        </div>

        <input
          type="text"
          className="search"
          placeholder="Tìm kiếm nhân viên"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          <Form >
            <table>
              <thead>
                <tr>
                  <th>Họ</th>
                  <th>Tên</th>
                  <th>SĐT</th>
                  <th>Địa chỉ</th>
                  <th>Ngày</th>
                  <th>Giới tính</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  tableData
                    .filter((row) =>
                      row.firstName.toLowerCase().includes(search)
                      || row.lastName.toLowerCase().includes(search)
                    )
                    .map((row, index) =>
                      (
                        <tr key={row.id}>
                          <td>{row.firstName}</td>
                          <td>{row.lastName}</td>
                          <td>{row.phone}</td>
                          <td>{row.address}</td>
                          <td>{row.date}</td>
                          <td>{row.male}</td>
                          <td>{row.email}</td>
                          
                          <td className="btn-replace">
                            
                            <button 
                              className="edit-btn"
                              
                              
                            >
                              <FontAwesomeIcon icon={faPenToSquare} />
                            </button>

                            
                            <button className="delete-btn" >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </td>
                        </tr>
                      )
                    )}
              </tbody>
            </table>
          </Form>
        </div>
      </div>
    </div>
  );
  
}

 


export { Staff };
