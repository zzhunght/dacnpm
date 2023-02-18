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
function AddPromotion() {
    return (  
        <>
                 <>
              <>
            <Form className="form-addstaff">
          <div className="form-group">
            <label className="label-addstaff">Nhập lí do: </label>
            <input className="input-addstaff" type="text" name="lastName" />          
          </div>
          <div className="form-group">
            <label className="label-addstaff">Nhập ngày bắt đầu: </label>
            <input className="input-addstaff" type="text"  name="lastName" /> 
          </div>
          <div className="form-group">
            <label className="label-addstaff">Nhập ngày kết thúc: </label>
            <input className="input-addstaff" type="text" name="lastName" />          
          </div>
          
          
          <div className="btnSaveAdd"><Link className="save-add-staff" to = "/promotion">Lưu</Link></div>
        </Form>
        </>
        </>
     
        </>
    );
}

export default AddPromotion;