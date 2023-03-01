import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosConfig";
import Add from "../../Button/Add";
import ReceiptDetailTable from "../../Table/ReceiptDetailTable";

const receiptDetailColumn = [
  {
    Header: "Mã LKDV",
    accessor: "MALKDV"
  },
  {
    Header: "Tên",
    accessor: data => `${data?.LINHKIENDICHVU?.TENLKDV}`
  },
  {
    Header: "Số lượng",
    accessor: "SOLUONG"
  },
  {
    Header: "GIÁ",
    accessor: "GIA"
  },
  {
    Header: "Khuyến mãi",
    accessor: data => `0%`
  },
]


function CarReceiptDetail() {
  const params = useParams();
  const id = params.id;
  const [receiptData, setReceiptData] = useState({});
  const [customer, setCustomer] = useState({});
  const [receiptDetail,setReceiptDetail] = useState([]);


  const [accessoryList,setAccessoryList] = useState([]);
  const [searchText,setSearchText] = useState()

  // phan nay cua them chi tiet phieu nhan 
  const [accessoryChooseCount,setAccessoryChooseCount] = useState(1)
  const [accessoryChoose,setAccessoryChoose] = useState({
    MAPN: id,
    MALKDV: null,
    GIA: 0,
    SOLUONG: accessoryChooseCount
  })

  let currentValue;
  let timeout


  useEffect(() => {
    const getData = async () => {
      const res = await axiosInstance.get("/receipt/detail/" + id);
      if (res?.data?.success) {
        setReceiptData({
          BIENSOXE: res.data?.receipt?.BIENSOXE,
          NGAYNHAN: res.data?.receipt?.NGAYNHAN,
          TINHTRANG: res.data?.receipt?.TINHTRANG,
          MAKH: res.data?.receipt?.MAKH,
          MANV: res.data?.receipt?.MANV,
          YKIENKH: res.data?.receipt?.YKIENKH,
        });
        setCustomer(res.data.receipt?.MAKH_KHACHHANG);
        console.log(res.data.receiptDetail)
        setReceiptDetail(res.data?.receiptDetail)
      }
    };
    getData();
  }, []);


  const onChange = () => {

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
    console.log('1234',newValue)

    if (newValue) {
      searchAccessory(newValue)
    } else {
      // setData([]);
    }
  };

  const handleSelectedChange = (newValue) => {

    // set value de hien thi label select
    setSearchText(newValue);
    
    const item = accessoryList.find(item => item.MALKDV === newValue)
    console.log('Selected',item);
    setAccessoryChoose({
      MAPN: id,
      MALKDV: item.MALKDV,
      GIA: item.GIA,
      SOLUONG: accessoryChooseCount
    })
  };

  const addReceiptDetail = async () =>{
    // console.log(accessoryChoose)
    const res = await axiosInstance.post('/receipt/detail',accessoryChoose)
    console.log(res)
    // setReceiptDetail()
    const isExiting = receiptDetail.find(item => item.MALKDV === res.data.item.MALKDV)
    if(isExiting){
      setReceiptDetail(x => {
        const newData =  x?.map(item => {
          if(item.MALKDV === res.data.item.MALKDV) return res.data.item
          return item
        })
        return newData
      })
    }
    else {
      setReceiptDetail(x => [res.data.item, ...x])
    }

  }
  const deleteReceiptDetail = async (data) => {
    console.log(data)
    const res = await axiosInstance.delete(`/receipt/detail?MAPN=${id}&MALKDV=${data.MALKDV}`)
    if(res.data.success) {
      setReceiptDetail( x => x.filter(item => item.MALKDV !== data.MALKDV))
    }
  }

  return (
    <>
      <div className="receipt-detail-wr">
        <div className="receipt-detail-content mt-12 flex-1">
          <p className="text size-20 bold">Chi tiết phiếu nhận</p>
          <div className="flex">
            <div className="form-group flex-1">
              <label className="form-label">Biển số xe</label>
              <input
                required
                type="text"
                className="form-input"
                value={receiptData?.BIENSOXE}
                name="BIENSOXE"
              />
            </div>
            <div className="form-group flex-1">
              <label className="form-label">Khách hàng</label>
              <input
                required
                type="text"
                className="form-input"
                value={`${customer?.HO} ${customer?.TEN}`}
                name="TENKHACHHANG"
              />
            </div>
            <div className="form-group flex-1">
              <label className="form-label">Ngày nhận </label>
              <input
                required
                type="date"
                className="form-input"
                value={receiptData?.NGAYNHAN}
                name="NGAYNHAN"
              />
            </div>
            <div className="form-group flex-1">
              <label className="form-label">Số điện thoại</label>
              <input
                required
                type="text"
                className="form-input"
                value={customer?.SDT}
                disabled
              />
            </div>
          </div>
          <div className="mt-24 flex">
          <div className="form-group flex-1">
            <label className="form-label">Ý kiến khách hàng</label>
            <textarea
              required
              type="text"
              className="form-textarea"
              value={receiptData?.YKIENKH}
              name="YKIENKH"
            ></textarea>
          </div>
          <div className="form-group flex-1">
            <label className="form-label">Tình trạng</label>
            <textarea
              required
              type="text"
              className="form-textarea"
              value={receiptData?.TINHTRANG}
              name="TINHTRANG"
            ></textarea>
          </div>
          </div>
          <p className="text size-20 bold">Thêm chi tiết sửa chữa</p>
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
                <label className="form-label">Số lượng</label>
                <input
                  required
                  type="text"
                  className="form-input"
                  value={accessoryChooseCount}
                  onChange={e =>{
                    setAccessoryChooseCount(e.target.value)
                    setAccessoryChoose({
                      ...accessoryChoose,
                      SOLUONG: e.target.value
                    })
                  }}
                />
              </div>
            </div>
            <Add title="Thêm" onClick={addReceiptDetail}/>
          </div>
          <p className="text size-20 bold mt-12">Chi tiết linh kiện dịch vụ đã sử dụng</p>
          <ReceiptDetailTable
           columns={receiptDetailColumn} 
           data={receiptDetail} 
           handleDeleteClick={deleteReceiptDetail}
          />

          <div className="flex mt-24">
            <Add title="Xuất phiếu trả" icon={false} className="mr-12"/>
            <Add title="Xuất hóa đơn " icon={false} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CarReceiptDetail;
