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
  import "./CarReceipt.css";
function AddCarReceipt() {
    return ( 
        <>
        <Form className="form-addstaff">
      <div className="form-group">
        <label className="label-addstaff">Nhập ngày nhận: </label>
        <input className="input-addstaff" type="text" name="lastName" />          
      </div>
      <div className="form-group">
        <label className="label-addstaff">Nhập biển số xe: </label>
        <input className="input-addstaff" type="text"  name="lastName" /> 
      </div>
      <div className="form-group">
        <label className="label-addstaff">Nhập tình trạng: </label>
        <input className="input-addstaff" type="text" name="lastName" />          
      </div>
      <div className="form-group">
        <label className="label-addstaff">Nhập mã nhân viên nhận: </label>
        <input className="input-addstaff" type="text" name="lastName" />          
      </div>
      <div className="form-group">
        <label className="label-addstaff">Nhập mã khách hàng: </label>
        <input className="input-addstaff" type="text" name="lastName" />          
      </div>
      
      
      <div className="btnSaveAdd"><Link className="save-add-staff" to = "/carreceipt">Lưu</Link></div>
    </Form>
    </>
     );
}

export default AddCarReceipt;