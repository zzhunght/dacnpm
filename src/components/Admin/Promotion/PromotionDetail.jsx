import { Select } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import axiosInstance from "../../../utils/axiosConfig";
import Add from "../../Button/Add";
import ReceiptDetailTable from "../../Table/ReceiptDetailTable";

const promotionDetailColumns = [
    {
        Header: "Mã Khuyến mãi",
        accessor: "MAKM"
    },
    {
        Header: "Tên LKDV",
        accessor: data => `${data?.LINHKIENDICHVU?.TENLKDV}`
    },
    {
        Header: "Mã LKDV",
        accessor: "MALKDV"
    },
  
    {
        Header: "Khuyến mãi (%)",
        accessor: "PTKM"
    },

]


function PromotionDetail() {
  const {messageApi} = useContext(AuthContext)


  const params = useParams();
  const id = params.id;
  const [promotion, setPromotion] = useState({});
  const [promotionDetail,setPromotionDetail] = useState([]);


  const [accessoryList,setAccessoryList] = useState([]);
  const [searchText,setSearchText] = useState()

  // phan nay cua them chi tiet phieu nhan 
  const [discount,setDiscount] = useState(0)
  const [accessoryChoose,setAccessoryChoose] = useState({
    MAKM: id,
    MALKDV: null,
    PTKM: discount
  })

  let currentValue;
  let timeout


  useEffect(() => {
    const getData = async () => {
      const res = await axiosInstance.get("/promotion/detail/" + id);
      console.log(res.data);
      if (res?.data?.success) {
        setPromotion({
            MAKM: res.data?.promotion.MAKM,
            LIDO: res.data?.promotion.LIDO,
            NGAYBATDAU: res.data?.promotion.NGAYBATDAU,
            NGAYKETTHUC: res.data?.promotion.NGAYKETTHUC
        });
        setPromotionDetail(res.data?.promotion?.CTKM)
      }
    };
    getData();
  }, []);


  const editPromotion = async () => {
    const res = await axiosInstance.post('/promotion/edit', promotion)
    console.log(res)
    if (res.data.success) {
        messageApi.open({
            type: 'success',
            content: 'Cập nhật thông tin khuyến mãi thành công !',
        });
    } else {
        messageApi.open({
            type: 'error',
            content: 'Cập nhật thông tin khuyến mãi thất bại !',
        });
    }
  }

  const onChange = (e) => {
    setPromotion({
        ...promotion,
        [e.target.name]: e.target.value
    })
  };

  const searchAccessory = async (value) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;
    
    const search = () => {
      axiosInstance.get(`/accessory/search?search=${value}`).then(res => {
        if(res.data?.success) {
          setAccessoryList(res.data.items)
        }
      })
    }
    
    timeout = setTimeout(search, 300);
  };


  const handleSearch = (newValue) => {

    if (newValue) {
      searchAccessory(newValue)
    }
  };

  const handleSelectedChange = (newValue) => {

    // set value de hien thi label select
    setSearchText(newValue);
    
    const item = accessoryList.find(item => item.MALKDV === newValue)
    setAccessoryChoose({
      MAKM: id,
      MALKDV: item.MALKDV,
      PTKM: discount
    })
  };

  const addPromotionDetail = async () =>{
    console.log(accessoryChoose)
    const res = await axiosInstance.post('/promotion/detail',accessoryChoose)
    console.log(res)
    const isExiting = promotionDetail.find(item => item.MALKDV === res.data.item.MALKDV)
    if(isExiting){
      setPromotionDetail(x => {
        const newData =  x?.map(item => {
          if(item.MALKDV === res.data.item.MALKDV) return res.data.item
          return item
        })
        return newData
      })
    }
    else {
      setPromotionDetail(x => [res.data.item, ...x])
    }

  }
  const deletePromotionDetail = async (data) => {
    const res = await axiosInstance.delete(`/promotion/detail?MAKM=${id}&MALKDV=${data.MALKDV}`)
    if(res.data.success) {
      setPromotionDetail( x => x.filter(item => item.MALKDV !== data.MALKDV))
    }
  }

  return (
    <>
      <div className="receipt-detail-wr">
        <div className="receipt-detail-content mt-12 flex-1">
          <div className="add-receipt-detail">
            <p className="text size-20 bold">Chi tiết khuyến mãi</p>
            <div className="flex">
                <div className="form-group flex-1">
                <label className="form-label">Lí do</label>
                <input
                    required
                    type="text"
                    className="form-input"
                    value={promotion?.LIDO}
                    name="LIDO"
                    onChange={onChange}
                />
                </div>
                <div className="form-group flex-1">
                <label className="form-label">Ngày bắt đầu</label>
                <input
                    required
                    type="date"
                    className="form-input"
                    value={promotion?.NGAYBATDAU}
                    onChange={onChange}
                    name="NGAYBATDAU"
                />
                </div>
                <div className="form-group flex-1">
                <label className="form-label">Ngày kết thúc</label>
                <input
                    required
                    type="date"
                    className="form-input"
                    value={promotion?.NGAYKETTHUC}
                    onChange={onChange}
                    name="NGAYKETTHUC"
                />
                </div>
            </div>
            <Add title="Lưu thay đổi" onClick={editPromotion} icon={false}/>

          </div>
        
          <p className="text size-20 bold">Thêm chi tiết khuyến mãi</p>
          <div className="add-receipt-detail">
            <div className="flex">
              <div className="form-group flex-1">
                <label className="form-label">Tên linh kiện</label>
                <Select
                  showSearch
                  size="large"
                  value={searchText}
                  placeholder={'Nhập tên linh kiện để tìm kiếm !'}
                  style={{
                    display: 'block',
                    height: '40px',
                    boder: 'none'
                  }}
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={handleSearch}
                  onChange={handleSelectedChange}
                  notFoundContent={null}
                  options={(accessoryList || []).map((d) => ({
                    label: d?.TENLKDV,
                    value: d?.MALKDV
                  }))}
                />
              </div> <div className="form-group flex-1">
                <label className="form-label">Phần trăm khuyến mãi</label>
                <input
                  required
                  type="text"
                  className="form-input"
                  value={discount}
                  onChange={e =>{
                    setDiscount(e.target.value)
                    setAccessoryChoose({
                      ...accessoryChoose,
                      PTKM: e.target.value
                    })
                  }}
                />
              </div>
            </div>
            <Add title="Thêm" onClick={addPromotionDetail}/>
          </div>
          <p className="text size-20 bold mt-12">Chi tiết các linh kiện và dịch vụ đang khuyến mãi</p>
          <ReceiptDetailTable
           columns={promotionDetailColumns} 
           data={promotionDetail} 
           handleDeleteClick={deletePromotionDetail}
          />
        </div>
      </div>
    </>
  );
}

export default PromotionDetail;
