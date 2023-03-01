import React, { useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosConfig";
import "./style.css";

function EditStaffModal({ form,setForm,setVisible,setData}) {
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
    const res = await axiosInstance.post('/staff/edit-staff', form)
    messageApi.destroy()
    console.log(res.data)
    if(res.data.success) {
      messageApi.open({
        type: 'success',
        content: 'Cập nhật thông tin thành công !',
      });
      setData(x => {
        const data = x.map(i =>{
          return i.MANV !== res.data.item.MANV ?  i : res.data.item
        })
        return [...data]
      })
    }
    else {
      messageApi.open({
        type: 'error',
        content: 'Cập nhật thất bại !',
      });
    }
  };
  return (
    <div className="modal-v1">
      <div className="overlay" onClick={() => setVisible(false)}></div>
      <form className="modal-form">
        <h1 className="title-medium modal-title">Chỉnh sửa thông tin nhân viên</h1>
        <div className="form">
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
            <div className="form-group flex-1">
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
          <div className="form-group">
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
          <div className="form-group">
            <label className="form-label">Giới tính</label>
            <select className="form-select" name="PHAI" onChange={onChange} value={form.PHAI}>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          
          <div className="form-group">
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

export default EditStaffModal;
