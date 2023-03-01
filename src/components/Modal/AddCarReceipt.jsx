import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosConfig";
import qs from 'qs';
import "./style.css";
import { Select } from 'antd';

function AddCarReceiptModal({ setVisible,setData }) {
  const {messageApi,user} = useContext(AuthContext)
  const [value, setValue] = useState();
  const [userChoose,setUserChoose] = useState([])

  let currentValue
  let timeout

  const [form, setForm] = useState({
    BIENSOXE: "",
    NGAYNHAN: "",
    TINHTRANG: "",
    MAKH: '1',
    MANV: user.MANV || '1',
    YKIENKH: '',
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const submit = async (e) => {
    e.preventDefault()
    for (let field in form) {
      if (!form[field]){
        return messageApi.open({
          type: 'error',
          content: 'Vui lòng điền đầy đủ thông tin !',
        });
      }
    }
    messageApi.open({
      type: 'loading',
      content: 'Đang xử lí..',
      duration: 0,
    });
    const res = await axiosInstance.post('/receipt/', form)
    messageApi.destroy()
    if(res.data.success) {
      messageApi.open({
        type: 'success',
        content: 'Thêm phiếu nhận thành công !',
      });
      setData(x => [res.data.item,...x])
    }
    else {
      messageApi.open({
        type: 'error',
        content: res.data.message,
      });
    }
  };

  const searchUser = async (value) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;
    
    const search = () => {
      axiosInstance.get(`/customer/search?search=${value}`).then(res => {
        setUserChoose(res.data.items)
      })
    }
    
    timeout = setTimeout(search, 300);
  };


  const handleSearch = (newValue) => {
    console.log('1234',newValue)

    if (newValue) {
      searchUser(newValue)
    } else {
      setData([]);
    }
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    setForm({
      ...form,
      MAKH: newValue
    })
  };

  return (
    <div className="modal-v1">
      <div className="overlay" onClick={() => setVisible(false)}></div>
      <form className="modal-form">
        <h1 className="title-medium modal-title">Tạo phiếu nhận xe</h1>
        <div className="form">
          <div className="flex spc-bw">
            <div className="form-group flex-1">
                <label className="form-label">Biển số xe</label>
                <input
                  required
                  type="text"
                  className="form-input"
                  value={form.BIENSOXE}
                  name="BIENSOXE"
                  onChange={onChange}
                />
            </div>
            <div className="form-group flex-1">
                <label className="form-label">Ngày nhận</label>
                <input
                  required
                  type="date"
                  className="form-input"
                  value={form.NGAYNHAN}
                  name="NGAYNHAN"
                  onChange={onChange}
                />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Khách hàng</label>
            {/* <select className="form-select" name="MAKH" onChange={onChange} value={form.MAKH}>
              <option value="1">Nam</option>
              <option value="1">Nữ</option>
            </select> */}
            <Select
              showSearch
              size="large"
              value={value}
              placeholder={'Nhập tên hoặc số điện thọai khách hàng để tìm kiếm !'}
              style={{
                display: 'block',
                height: '40px',
                boder: 'none'
              }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={handleSearch}
              onChange={handleChange}
              notFoundContent={null}
              options={(userChoose || []).map((d) => ({
                label: d.HO +' '+ d.TEN + ' - ' + d.SDT,
                value: d.MAKH
              }))}
            />
          </div>
          <div className="form-group mt-24">
            <label className="form-label">Ý kiến khách hàng</label>
            <textarea
              type="text"
              className="form-textarea"
              value={form.YKIENKH}
              name="YKIENKH"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="form-group mt-24">
            <label className="form-label">Tình trạng xe</label>
            <textarea
              type="text"
              className="form-textarea"
              value={form.TINHTRANG}
              name="TINHTRANG"
              onChange={onChange}
            ></textarea>
          </div>
        </div>
        <div className="modal-btn">
          <button
            className="modal-btn-cancle"
            onClick={() => setVisible(false)}
          >
            Hủy
          </button>
          <button className="modal-btn-save" type="submit" onClick={submit}>
            Lưu
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCarReceiptModal;
