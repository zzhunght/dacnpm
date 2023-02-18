import {
    faCircleXmark,
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
  import "./Promotion.css";
  const rawData = [
    {
      id: 1,
      reason: "Mừng tết lớn, khuyến mãi lớn",
      price: "10000",
      startday: "20/12/12",
      enddate: "20/12/12",
    },
    {
        id: 2,
        reason: "Mừng tết lớn, khuyến mãi lớn",
        price: "10000",
        startday: "20/12/12",
        enddate: "20/12/12",
      },
      {
        id: 3,
        reason: "Mừng tết lớn, khuyến mãi lớn",
        price: "10000",
        startday: "20/12/12",
        enddate: "20/12/12",
      },
      {
        id: 4,
        reason: "Mừng tết lớn, khuyến mãi lớn",
        price: "10000",
        startday: "20/12/12",
        enddate: "20/12/12",
      },
      {
        id: 5,
        reason: "Mừng tết lớn, khuyến mãi lớn",
        price: "10000",
        startday: "20/12/12",
        enddate: "20/12/12",
      },
    
  ];
function Promotion() {
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
          <div className="header-accessory-container">
            <h4 className="header-accessory-name">Khuyến mãi</h4>
            <Link className="add-accessory" to="/addPromotion">Thêm Khuyến mãi</Link>
          </div>
  
          <input
            type="text"
            className="search"
            placeholder="Tìm kiếm khuyến mãi"
            onChange={(e) => setSearch(e.target.value)}
          />
  
          <div>
            <Form onSubmit={handleSubmit}>
              <table>
                <thead>
                  <tr>
                    <th>Mã khuyến mãi</th>
                    <th>Lí do </th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    tableData
                      .filter((row) =>
                        row.startday.toLowerCase().includes(search)
                        
                      )
                      .map((row, index) =>
                        updateSate === row.id ? (
                          <EditPromotion
                            row={row}
                            tableData={tableData}
                            setTableData={setTableData}
                          />
                        ) : (
                          <tr key={row.id}>
                            {/* <td>{row.id}</td> */}
                            <td>{row.reason}</td>
                            <td>{row.startday}</td>
                            <td>{row.enddate}</td>
                            
                            <td className="btn-replace">
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
      const reason = e.target.elements.reason.value;
      const startday = e.target.elements.startday.value;
      const enddate = e.target.elements.enddate.value;
      
     
      const newList = tableData.map((li) =>
        li.id === updateSate
          ? {
              ...li,
              reason: reason,
              startday: startday,
              enddate: enddate,
             
            }
          : li
      );
      setTableData(newList);
      setUpdateState(-1);
    }
  }
  
  function EditPromotion({ row, tableData, setTableData }) {
    
    function handleInputreason(e) {
      const value = e.target.value;
      const newList = tableData.map((li) =>
        li.id === row.id ? { ...li, reason: value } : li
      );
      setTableData(newList);
    }
  
    function handleInputstartday(e) {
      const value = e.target.value;
      const newList = tableData.map((li) =>
        li.id === row.id ? { ...li, startday: value } : li
      );
      setTableData(newList);
    }
    function handleInputendday(e) {
      const value = e.target.value;
      const newList = tableData.map((li) =>
        li.id === row.id ? { ...li, enddate: value } : li
      );
      setTableData(newList);
    }
    
  
    return (
      <tr>
        <td>
          <input
            style={{ zIndex: 1 }}
            type="text"
            onChange={handleInputreason}
            name="reason"
            value={row.reason}
          />
        </td>
        <td>
          {" "}
          <input
            type="text"
            name="startday"
            onChange={handleInputstartday}
            value={row.startday}
          />
        </td>
        <td>
          {" "}
          <input
            type="text"
            name="enddate"
            onChange={handleInputendday}
            value={row.enddate}
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

export default Promotion;