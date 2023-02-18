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
  import "./Customer.css";
  const rawData = [
    {
      id: 1,
      firstName: "A",
      lastName: "Nguyen",
      phone: "01234567",
      address: "97 man thiện, hiệp phú",
    },
    {
      id: 2,
      firstName: "A",
      lastName: "Nguyen",
      phone: "01234567",
      address: "97 man thiện, hiệp phú",
      
    },
    {
      id: 3,
      firstName: "A",
      lastName: "Nguyen",
      phone: "01234567",
      address: "97 man thiện, hiệp phú",
      
    },
    {
      id: 4,
      firstName: "B",
      lastName: "Nguyen Nguyen",
      phone: "01234567",
      address: "97 man thiện, hiệp phú",
      
    },
    {
      id: 5,
      firstName: "A",
      lastName: "Nguyen",
      phone: "01234567",
      address: "97 man thiện, hiệp phú",
      
    },
  ];
function Customer() {
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
        <div className="header-customer-container">
          <h4 className="header-customer-name">KHÁCH HÀNG</h4>
          <Link className="add-customer" to="/addCustomer">Thêm khách hàng</Link>
        </div>

        <input
          type="text"
          className="search"
          placeholder="Tìm kiếm khách hàng"
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          <Form onSubmit={handleSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Họ</th>
                  <th>Tên</th>
                  <th>SĐT</th>
                  <th>Địa chỉ</th>
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
                      updateSate === row.id ? (
                        <EditCustomer
                          row={row}
                          tableData={tableData}
                          setTableData={setTableData}
                        />
                      ) : (
                        <tr key={row.id}>
                          <td>{row.lastName}</td>
                          <td>{row.firstName}</td>
                          <td>{row.phone}</td>
                          <td>{row.address}</td>
                          
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
    const firstName = e.target.elements.firstName.value;
    const lastName = e.target.elements.lastName.value;
    const phone = e.target.elements.phone.value;
    const address = e.target.elements.address.value;
   
    const newList = tableData.map((li) =>
      li.id === updateSate
        ? {
            ...li,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            address: address,
           
          }
        : li
    );
    setTableData(newList);
    setUpdateState(-1);
  }
}

function EditCustomer({ row, tableData, setTableData }) {
  function handleInputfirstname(e) {
    const value = e.target.value;
    const newList = tableData.map((li) =>
      li.id === row.id ? { ...li, firstName: value } : li
    );
    setTableData(newList);
  }
  function handleInputlastname(e) {
    const value = e.target.value;
    const newList = tableData.map((li) =>
      li.id === row.id ? { ...li, lastName: value } : li
    );
    setTableData(newList);
  }

  function handleInputphone(e) {
    const value = e.target.value;
    const newList = tableData.map((li) =>
      li.id === row.id ? { ...li, phone: value } : li
    );
    setTableData(newList);
  }
  function handleInputlastaddress(e) {
    const value = e.target.value;
    const newList = tableData.map((li) =>
      li.id === row.id ? { ...li, address: value } : li
    );
    setTableData(newList);
  }
  

  return (
    <tr>
      <td>
        <input
          style={{ zIndex: 1 }}
          type="text"
          onChange={handleInputlastname}
          name="lastname"
          value={row.lastName}
        />
      </td>
      <td>
        {" "}
        <input
          type="text"
          name="firstname"
          onChange={handleInputfirstname}
          value={row.firstName}
        />
      </td>
      <td>
        {" "}
        <input
          type="text"
          name="phone"
          onChange={handleInputphone}
          value={row.phone}
        />
      </td>
      <td>
        <input
          type="text"
          name="address"
          onChange={handleInputlastaddress}
          value={row.address}
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

export default EditCustomer;

export { Customer, EditCustomer };
