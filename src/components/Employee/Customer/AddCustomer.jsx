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
function AddCustomer() {
    return (
        <>
            <Form className="form-addstaff">
          <div className="form-group">
            <label className="label-addstaff">Nhập họ: </label>
            <input className="input-addstaff" type="text" name="lastName" />          
          </div>
          <div className="form-group">
            <label className="label-addstaff">Nhập tên: </label>
            <input className="input-addstaff" type="text"  name="lastName" /> 
          </div>
          <div className="form-group">
            <label className="label-addstaff">Nhập địa chỉ: </label>
            <input className="input-addstaff" type="text" name="lastName" />          
          </div>
          <div className="form-group">
            <label className="label-addstaff">Nhập SĐT: </label>
            <input className="input-addstaff" type="text"  name="lastName" /> 
          </div>
          
          <div className="btnSaveAdd"><Link className="save-add-staff" to = "/customer">Lưu</Link></div>
        </Form>
        </>
      );
}

export default AddCustomer;