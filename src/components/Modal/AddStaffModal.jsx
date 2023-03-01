import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosConfig";
import "./style.css";

function AddStaffModal({ setVisible, setData }) {
  const [form, setForm] = useState({
    HO: "",
    TEN: "",
    PHAI: "Nam",
    DIACHI: "",
    SDT: "",
    EMAIL: "",
    NGAYSINH: "",
    TENTK: "",
    MATKHAU: "",
    MAQUYEN: "1",
  });
  const {messageApi} = useContext(AuthContext)

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
    const res = await axiosInstance.post('/staff/add-staff', form)
    messageApi.destroy()
    if(res.data.success) {
      messageApi.open({
        type: 'success',
        content: 'Thêm nhân viên thành công !',
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
  return (
    <div className="modal-v1">
      <div className="overlay" onClick={() => setVisible(false)}></div>
      <form className="modal-form">
        <h1 className="title-medium modal-title">Thêm nhân viên</h1>
        <div className="form">
          <div className="flex spc-bw">
            <div className="form-group flex-1">
              <label className="form-label">Tên tài khoản</label>
              <input
                required
                type="text"
                className="form-input"
                value={form.TENTK}
                name="TENTK"
                onChange={onChange}
              />
            </div>
            <div className="form-group flex-1">
              <label className="form-label">Mật khẩu</label>
              <input
                required
                type="text"
                className="form-input"
                value={form.MATKHAU}
                name="MATKHAU"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="form-group">
              <label className="form-label">Email</label>
              <input
                required
                type="text"
                className="form-input"
                value={form.EMAIL}
                name="EMAIL"
                onChange={onChange}
              />
            </div>
          <div className="flex spc-bw">
            <div className="form-group flex-1 ">
                <label className="form-label">Họ</label>
                <input
                  required
                  type="text"
                  className="form-input"
                  value={form.HO}
                  name="HO"
                  onChange={onChange}
                />
            </div>
            <div className="form-group flex-1">
                <label className="form-label">Tên</label>
                <input
                  required
                  type="text"
                  className="form-input"
                  value={form.TEN}
                  name="TEN"
                  onChange={onChange}
                />
            </div>
          </div>
          <div className="flex spc-bw">
          <div className="form-group flex-1">
            <label className="form-label">Số điện thoại</label>
            <input
              required
              type="text"
              className="form-input"
              value={form.SDT}
              name="SDT"
              onChange={onChange}
            />
          </div>
          <div className="form-group flex-1">
            <label className="form-label">Giới tính</label>
            <select className="form-select" name="PHAI" onChange={onChange} value={form.PHAI}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          
          <div className="form-group flex-1">
            <label className="form-label">Ngày sinh</label>
            <input
              required
              type="date"
              className="form-input"
              value={form.NGAYSINH}
              name="NGAYSINH"
              onChange={onChange}
            />
          </div>
          </div>
          <div className="form-group">
            <label className="form-label">Địa chỉ</label>
            <textarea
              type="text"
              className="form-textarea"
              value={form.DIACHI}
              name="DIACHI"
              onChange={onChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">Vai trò</label>
            <select className="form-select" name="MAQUYEN" onChange={onChange} value={form.MAQUYEN}>
              <option value="1">Nhân viên</option>
              <option value="0">Quản lí</option>
            </select>
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

export default AddStaffModal;
