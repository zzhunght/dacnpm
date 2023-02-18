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
      status: "Chất lượng phụ tùng không tốt.Lỗi lắp ráp.",
      feedback:1,
    },
    {
      id: 2,
      date: "12/12/12",
      status: "Chất lượng phụ tùng không tốt.Lỗi lắp ráp.",
      feedback:1,
    },
   
    {
      id: 3,
      date: "12/12/12",
      status: "Chất lượng phụ tùng không tốt.Lỗi lắp ráp.",
      feedback:1,
    },
   
    {
      id: 4,
      date: "12/12/12",
      status: "Chất lượng phụ tùng không tốt.Lỗi lắp ráp.",
      feedback:1,
    },
   
   
  ];
  function Pay() {
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
              <h4 className="header-receipt-name">DANH SÁCH PHIẾU TRẢ XE</h4>
              <Link className="add-receipt" to="/addCarReceipt">Thêm phiếu trả xe</Link>
            </div>
    
            <input
              type="text"
              className="search"
              placeholder="Tìm kiếm phiếu trả xe"
              onChange={(e) => setSearch(e.target.value)}
            />
    
            <div>
              <Form >
                <table>
                  <thead>
                    <tr>
                      <th>Ngày trả</th>
                      <th>Tình trạng</th>
                      <th>Phản hồi</th>
                     
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading &&
                      tableData
                        .filter((row) =>
                          row.date.toLowerCase().includes(search)
                        )
                        .map((row, index) =>
                          (
                            <tr key={row.id}>
                              <td>{row.date}</td>
                              <td>{row.status}</td>
                              <td>{row.feedback}</td>
                              
                              
                              <td className="btn-replace">
                                <Link to="/deatilPay">
                                  <FontAwesomeIcon className="view-btn" icon={faEye}/>
                                </Link>
                                <button
                                  className="edit-btn"
                                  
                                  
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
     
      function handleDelete(id) {
        const newlist = tableData.filter((li) => li.id !== id)
        setTableData(newlist)
    }
    
      
    }
    
    



export default Pay;