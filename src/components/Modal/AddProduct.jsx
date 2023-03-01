import React, { useContext, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import "./style.css";
import { AuthContext } from "../../context/AuthContext";
function AddProductModal({ setVisible, setData }) {
  const {messageApi,user} = useContext(AuthContext)

  const [form, setForm] = useState({
    MANV: user.MANV || 1,
    TENLKDV: "",
    GIA: "",
    LOAI: "Linh kiện",
    SOLUONGTON: "",
  });
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    messageApi.open({
      type: 'loading',
      content: 'Đang xử lí..',
      duration: 0,
    });
    const res = await axiosInstance.post("/accessory/add-item", form);
    console.log(res);

    if (res.data.success) {
      messageApi.destroy()
      messageApi.open({
        type: 'success',
        content: 'Thêm linh kiện thành công !',
      });
      setData(x => [res.data.item,...x])
      
    }
  };
  return (
    <>
    <div className="modal-v1">
      <div className="overlay" onClick={() => setVisible(false)}></div>
      <form className="modal-form">
        <h1 className="title-medium modal-title">
          Thêm linh kiện hoặc dịch vụ mới
        </h1>
        <div className="form">
          <div className="form-group">
            <label className="form-label">Tên</label>
            <input
              required
              type="text"
              className="form-input"
              value={form.TENLKDV}
              name="TENLKDV"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Số lượng</label>
            <input
              required
              type="number"
              className="form-input"
              value={form.SOLUONGTON}
              name="SOLUONGTON"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Giá</label>
            <input
              required
              type="number"
              className="form-input"
              value={form.GIA}
              name="GIA"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Loại</label>
            <select
              className="form-select"
              name="LOAI"
              onChange={onChange}
              value={form.LOAI}
            >
              <option value="Linh kiện">Linh kiện</option>
              <option value="Dịch vụ">Dịch vụ</option>
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
          <button className="modal-btn-save" onClick={onSubmit}>
            Lưu
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default AddProductModal;
