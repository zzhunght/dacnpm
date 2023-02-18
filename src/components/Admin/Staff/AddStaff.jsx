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
  import "./Staff.css";


function AddStaff() {

    return <>
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
            <label className="label-addstaff">Nhập SĐT: </label>
            <input className="input-addstaff" type="text" name="lastName" />          
          </div>
          <div className="form-group">
            <label className="label-addstaff">Nhập Địa chỉ: </label>
            <input className="input-addstaff" type="text"  name="lastName" /> 
          </div>
          <div className="form-group">
            <label className="label-addstaff">Nhập ngày sinh: </label>
            <input className="input-addstaff" type="text" name="lastName" />          
          </div>
          <div className="form-group">
            <label className="label-addstaff">Nhập giới tính: </label>
            <input className="input-addstaff" type="text"  name="lastName" /> 
          </div>
          <div className="form-group">
            <label className="label-addstaff">Nhập email: </label>
            <input className="input-addstaff" type="text"  name="lastName" /> 
          </div>
          <div className="btnSaveAdd"><Link className="save-add-staff" to = "/staff">Lưu</Link></div>
        </Form>
    </>;
}

export default AddStaff;