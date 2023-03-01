import React, { useContext, useEffect, useState } from "react";
import Table from "../../Table/Table";
import "./Accessory.css";
import SearchBar from '../../search/SearchBar'
import Add from "../../Button/Add";
import AddProductModal from "../../Modal/AddProduct";
import EditProductModal from "../../Modal/EditProduct";
import axiosInstance from "../../../utils/axiosConfig";
import Delete from "../../Button/Delete";
import { AuthContext } from "../../../context/AuthContext";

const columns = [
  {
    Header: "Mã LKDV",
    accessor: "MALKDV"
  },
  {
    Header: "Tên",
    accessor: "TENLKDV",
  },
  {
    Header: "Loại",
    accessor: "LOAI",
    Cell: (props) => <span className="number">{props.value}</span>,
  },
  {
    Header: "Số lượng tồn",
    accessor: "SOLUONGTON",
  },
  {
    Header: "Giá",
    accessor: data => data?.CHITIETLKDV[0].GIA,
  },
];

function Accessory() {
  const [selected,setSelected] = useState([])
  const [showAddModal,setShowAddModal] = useState(false)
  const [showEditModal,setShowEditModal] = useState(false)
  const [editData, setEditData] = useState({})
  const [data, setData] = useState([])
  const {messageApi} = useContext(AuthContext)


  useEffect(() => {
    const getdata = async() =>{
      const res = await axiosInstance.get('/accessory')
      const data = res.data
      console.log(data)
      setData(data.items)
    }
    getdata()
  },[])

  const handleSelectedAll = (e) => {
    if(e.target.checked) {
      setSelected(data?.map(i => i.MALKDV))
    } else {
      setSelected([])
    }

  }

  const handleSelected = (e, id) => {
    if (e.target.checked ) {
      setSelected(x => [...x, id])
    } else {
      const newSelelected = selected.filter(i => i !== id)
      setSelected(newSelelected)
    }
  }

  const handleEditClick = (data) => {
    console.log(data) 
    setEditData({
      ...data,
      GIA : parseInt(data.Giá)
    })
    setShowEditModal(true)
  }
  const onDelete = async () => {

    const res = await axiosInstance.delete('/accessory/delete-items?Ids=' + selected.join(','))
    if(res.data.success) {
      messageApi.open({
        type: 'success',
        content: 'Thao tác thành công !',
      });
      const newData = data?.filter(i => !selected.includes(i.MALKDV))
      setData(newData)
      setSelected([])
    }
  }

  return (
    <>
    <div>
        <div className="header-receipt-container">
          <h4 className="title-medium">LINH KIỆN VÀ DỊCH VỤ</h4>
          <div className="flex mb-16 al-ct spc-bw">
            <SearchBar/>
            <div className="flex">
              <Add title='Thêm sản phẩm mới' onClick={()=>setShowAddModal(true)}/>
              <Delete disabled={selected.length === 0 ? true : false} onClick={onDelete}/>
            </div>
          </div>
        </div>

      <Table
       data={data} 
       columns={columns} 
       handleSelected={handleSelected}
       handleSelectedAll={handleSelectedAll}
       selected={selected}
       handleEditClick={handleEditClick}
      />
    </div>
    {showAddModal && (
      <AddProductModal
      setVisible={setShowAddModal}
      setData={setData}
     />
    )}
    {showEditModal && (
      <EditProductModal
      setVisible={setShowEditModal}
      form={editData}
      setForm={setEditData}
      setData={setData}
     />

    )}
    </>
  );
}

export default Accessory;
