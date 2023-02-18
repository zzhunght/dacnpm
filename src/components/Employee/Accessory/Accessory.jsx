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
import "./Accessory.css";

const rawData = [
  {
        id: 1,
        name: "Lược nhớt",
        price: "10000",
        inventory: "20",
        type: "Phụ tùng",
      },
      {
        id: 2,
        name: "Bugi",
        price: "1000",
        inventory: "500",
        type: "Phụ tùng",
      },
      {
        id: 3,
        name: "Dầu động cơ",
        price: "500",
        inventory: "500",
        type: "LOẠI PHỤ PHẪM, DẦU MỠ",
      },
      {
        id: 4,
        name: "Săm, lốp",
        price: "10",
        inventory: "10",
        type: "Phụ tùng",
      },
      {
        id: 5,
        name: "Gioăng đệm",
        price: "950",
        inventory: "60",
        type: "Phụ tùng",
      },
];
function Accessory() {
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
          <h4 className="header-receipt-name">LINH KIỆN VÀ DỊCH VỤ</h4>
          <Link className="add-receipt" to="/addAccessory">Thêm linh kiện và dịch vụ</Link>
        </div>

        <input
          type="text"
          className="search"
          placeholder="Tìm kiếm linh kiện và dịch vụ"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          <Form onSubmit={handleSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Giá</th>
                  <th>Số lượng tồn</th>
                  <th>Loại</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  tableData
                    .filter((row) =>
                      row.name.toLowerCase().includes(search)
                      || row.type.toLowerCase().includes(search)
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
                          <td>{row.name}</td>
                          <td>{row.price}</td>
                          <td>{row.inventory}</td>
                          <td>{row.type}</td>
                          
                          <td className="btn-replace">
                            {/* <Link to="/deatilCarReceipt">
                              <FontAwesomeIcon className="view-btn" icon={faEye}/>
                            </Link> */}
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
    const name = e.target.elements.name.value;
    const price = e.target.elements.price.value;
    const inventory = e.target.elements.inventory.value;
    const type = e.target.elements.type.value;
   
    const newList = tableData.map((li) =>
      li.id === updateSate
        ? {
            ...li,
            name: name,
            price: price,
            inventory: inventory,
            type:type,
           
          }
        : li
    );
    setTableData(newList);
    setUpdateState(-1);
  }
}

function EditCarReceipt({ row, tableData, setTableData }) {
  function handleInputname(e) {
    const value = e.target.value;
    const newList = tableData.map((li) =>
      li.id === row.id ? { ...li, name: value } : li
    );
    setTableData(newList);
  }
  function handleInputprice(e) {
    const value = e.target.value;
    const newList = tableData.map((li) =>
      li.id === row.id ? { ...li, price: value } : li
    );
    setTableData(newList);
  }

  function handleInputinventory(e) {
    const value = e.target.value;
    const newList = tableData.map((li) =>
      li.id === row.id ? { ...li, inventory: value } : li
    );
    setTableData(newList);
  }
  function handleInputtype(e) {
    const value = e.target.value;
    const newList = tableData.map((li) =>
      li.id === row.id ? { ...li, type: value } : li
    );
    setTableData(newList);
  }
  
return ( 
    <tr>
    <td>
      <input
        style={{ zIndex: 1 }}
        type="text"
        onChange={handleInputname}
        name="name"
        value={row.name}
      />
    </td>
    <td>
      {" "}
      <input
        type="text"
        name="price"
        onChange={handleInputprice}
        value={row.price}
      />
    </td>
    <td>
      {" "}
      <input
        type="text"
        name="inventory"
        onChange={handleInputinventory}
        value={row.inventory}
      />
    </td>
    <td>
      {" "}
      <input
        type="text"
        name="type"
        onChange={handleInputtype}
        value={row.type}
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

export default Accessory