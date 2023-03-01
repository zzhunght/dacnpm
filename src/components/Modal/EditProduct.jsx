import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosConfig";
import "./style.css";
function EditProductModal({ form, setForm, setVisible, setData }) {
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const {messageApi} = useContext(AuthContext)

  const save = async() => {
    messageApi.open({
      type: 'loading',
      content: 'Đang xử lí..',
      duration: 0,
    });
    const res = await axiosInstance.post('/accessory/edit-item', form)
    messageApi.destroy()
    console.log(res.data)
    if(res.data.success) {
      messageApi.open({
        type: 'success',
        content: 'Cập nhật linh kiện thành công !',
      });
      setData(x => {
        const data = x.map(i =>{
          return i.MALKDV !== res.data.item.MALKDV ?  i : res.data.item
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
  }
  return (
    <div className="modal-v1">
      <div className="overlay" onClick={() => setVisible(false)}></div>
      <div className="modal-form">
        <h1 className="title-medium modal-title">
          Chỉnh sửa linh kiện dịch vụ
        </h1>
        <div className="form">
          <div className="form-group">
            <label className="form-label">Tên</label>
            <input
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
              type="number"
              className="form-input"
              value={form.GIA}
              name="GIA"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">LOẠI</label>
            <select className="form-select" name="LOAI" onChange={onChange} value={form.LOAI}>
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
          <button className="modal-btn-save" onClick={save}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProductModal;
