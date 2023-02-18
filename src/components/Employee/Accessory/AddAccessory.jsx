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
  import "./Accessory.css";
function AddAccessory() {
    return ( 
        <>
              <>
            <Form className="form-addstaff">
          <div className="form-group">
            <label className="label-addstaff">Nhập tên linh kiện và dịch vụ: </label>
            <input className="input-addstaff" type="text" name="lastName" />          
          </div>
          <div className="form-group">
            <label className="label-addstaff">Nhập giá: </label>
            <input className="input-addstaff" type="text"  name="lastName" /> 
          </div>
          <div className="form-group">
            <label className="label-addstaff">Nhập số lượng tồn: </label>
            <input className="input-addstaff" type="text" name="lastName" />          
          </div>
          <div className="form-group">
            <label className="label-addstaff">Nhập Loại: </label>
            <input className="input-addstaff" type="text"  name="lastName" /> 
          </div>
          
          <div className="btnSaveAdd"><Link className="save-add-staff" to = "/accessory">Lưu</Link></div>
        </Form>
        </>
        </>
     );
}

export default AddAccessory;