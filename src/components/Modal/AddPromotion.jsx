import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosConfig";
import "./style.css";

function AddPromotionModal({ setVisible,setData }) {
  const [form, setForm] = useState({
    LIDO: "",
    NGAYBATDAU: "",
    NGAYKETTHUC: "",
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
    const res = await axiosInstance.post('/promotion/', form)
    messageApi.destroy()
    console.log(res.data)
    if(res.data.success) {
      messageApi.open({
        type: 'success',
        content: 'Thêm khách hàng thành công !',
      });
    //   setData(x => [res.data.item,...x])
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
        <h1 className="title-medium modal-title">Thêm đợt khuyến mãi</h1>
        <div className="form">
          
          <div className="form-group">
            <label className="form-label">Lí do</label>
            <input
              type="text"
              className="form-input"
              value={form.LIDO}
              name="LIDO"
              onChange={onChange}
            />
          </div>
          <div className="flex spc-bw">
            <div className="form-group flex-1">
                <label className="form-label">Ngày bắt đầu</label>
                <input
                    type="date"
                    className="form-input"
                    value={form.NGAYBATDAU}
                    name="NGAYBATDAU"
                    onChange={onChange}
                />
            </div>
            <div className="form-group flex-1">
                <label className="form-label">Ngày kết thúc</label>
                <input
                    type="date"
                    className="form-input"
                    value={form.NGAYKETTHUC}
                    name="NGAYKETTHUC"
                    onChange={onChange}
                />
            </div>
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

export default AddPromotionModal;
