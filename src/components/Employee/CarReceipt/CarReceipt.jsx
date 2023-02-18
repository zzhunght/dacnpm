import {
    faCircleXmark,
    faEye,
    faFloppyDisk,
    faMagnifyingGlass,
    faPenToSquare,
    faSpinner,
    faTrashCan,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import React, { useEffect, useState } from "react";
  import { Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
  import "./CarReceipt.css";
  const rawData = [
    {
      id: 1,
      date: "12/12/12",
      licensePlates: "289123",
      status: "Chất lượng phụ tùng không tốt.Lỗi lắp ráp.",
      idnv:1,
      idkh:1,
    },
    {
        id: 2,
        date: "12/12/12",
        licensePlates: "289123",
        status: "Chất lượng phụ tùng không tốt.Lỗi lắp ráp.",
        idnv:2,
        idkh:2,
    },
    {
        id: 3,
        date: "12/12/12",
        licensePlates: "289123",
        status: "Chất lượng phụ tùng không tốt.Lỗi lắp ráp.",
        idnv:3,
        idkh:3
    },
    {
        id: 4,
        date: "12/12/12",
        licensePlates: "289123",
        status: "Chất lượng phụ tùng không tốt.Lỗi lắp ráp.",
        idnv:4,
        idkh:4,
    },
    {
        id: 5,
        date: "12/12/12",
        licensePlates: "44",
        status: "Chất lượng phụ tùng không tốt.Lỗi lắp ráp.",
        idnv:5,
        idkh:5,
    },
  ];
  function CarReceipt() {
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
              <h4 className="header-receipt-name">DANH SÁCH PHIẾU NHẬN XE</h4>
              <Link className="add-receipt" to="/addCarReceipt">Thêm phiếu nhận xe</Link>
            </div>
    
            <input
              type="text"
              className="search"
              placeholder="Tìm kiếm phiếu nhận xe"
              onChange={(e) => setSearch(e.target.value)}
            />
    
            <div>
              <Form onSubmit={handleSubmit}>
                <table>
                  <thead>
                    <tr>
                      <th>Ngày nhận</th>
                      <th>Biển số xe</th>
                      <th>Tình trạng</th>
                      <th>Mã nhân viên nhận</th>
                      <th>Mã khách hàng</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading &&
                      tableData
                        .filter((row) =>
                          row.date.toLowerCase().includes(search)
                          || row.licensePlates.toLowerCase().includes(search)
                        )
                        .map((row, index) =>
                          updateSate === row.id ? (
                            <EditCarReceipt
                              row={row}
                              tableData={tableData}
                              setTableData={setTableData}
                            />
                          ) : (
                            <tr key={row.id}>
                              <td>{row.date}</td>
                              <td>{row.licensePlates}</td>
                              <td>{row.status}</td>
                              <td>{row.idnv}</td>
                              <td>{row.idkh}</td>
                              
                              <td className="btn-replace">
                                <Link to="/deatilCarReceipt">
                                  <FontAwesomeIcon className="view-btn" icon={faEye}/>
                                </Link>
                                <button
                                  className="edit-btn"
                                  onClick={() => handleEdit(row.id)}
                                  
                                >
                                  <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button className="delete-btn" onClick={() => handleDelete(row.id)}>
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
      function handleEdit(id) {
        setUpdateState(id);
      }
      function handleDelete(id) {
        const newlist = tableData.filter((li) => li.id !== id)
        setTableData(newlist)
    }
    
      function handleSubmit(e) {
        e.preventDefault();
        const date = e.target.elements.date.value;
        const licensePlates = e.target.elements.licensePlates.value;
        const status = e.target.elements.status.value;
       
        const newList = tableData.map((li) =>
          li.id === updateSate
            ? {
                ...li,
                date: date,
                licensePlates: licensePlates,
                status: status,
               
              }
            : li
        );
        setTableData(newList);
        setUpdateState(-1);
      }
    }
    
    function EditCarReceipt({ row, tableData, setTableData }) {
      function handleInputdate(e) {
        const value = e.target.value;
        const newList = tableData.map((li) =>
          li.id === row.id ? { ...li, date: value } : li
        );
        setTableData(newList);
      }
      function handleInputlicensePlates(e) {
        const value = e.target.value;
        const newList = tableData.map((li) =>
          li.id === row.id ? { ...li, licensePlates: value } : li
        );
        setTableData(newList);
      }
    
      function handleInputstatus(e) {
        const value = e.target.value;
        const newList = tableData.map((li) =>
          li.id === row.id ? { ...li, status: value } : li
        );
        setTableData(newList);
      }
      
    return ( 
        <tr>
        <td>
          <input
            style={{ zIndex: 1 }}
            type="text"
            onChange={handleInputdate}
            name="date"
            value={row.date}
          />
        </td>
        <td>
          {" "}
          <input
            type="text"
            name="licensePlates"
            onChange={handleInputlicensePlates}
            value={row.licensePlates}
          />
        </td>
        <td>
          {" "}
          <input
            type="text"
            name="status"
            onChange={handleInputstatus}
            value={row.status}
          />
        </td>
        
      
        <td className="btn-replace">
          <button className="btn-update">
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </td>
      </tr>
    );
}

export default CarReceipt;