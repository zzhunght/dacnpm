import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axiosInstance from "../../../utils/axiosConfig";
import Add from "../../Button/Add";
import Delete from "../../Button/Delete";
import AddCustomerModal from "../../Modal/AddCustomer";
import EditCustomerModal from "../../Modal/EditCustomer";
import SearchBar from "../../search/SearchBar";
import Table from "../../Table/Table";
import "./Customer.css";

const columns = [
  {
    Header: "ID",
    accessor: "MAKH",
  },
  {
    Header: "Tên",
    accessor: "TEN",
  },
  {
    Header: "Họ",
    accessor: "HO",
  },
  {
    Header: "Dịa Chỉ",
    accessor: "DIACHI",
  },
  {
    Header: "Số điện thoại",
    accessor: "SDT",
  },
];
export default function Customer() {
  const [selected, setSelected] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [data, setData] = useState([]);
  const { messageApi } = useContext(AuthContext);
  useEffect(() => {
    const getdata = async() =>{
      const res = await axiosInstance.get('/customer')
      const data = res.data
      if(data.success) {
        setData(data.items)
      }
    }
    getdata()
  }, []);
  const handleSelectedAll = (e) => {
    if (e.target.checked) {
      setSelected(data?.map((i) => i.MALKDV));
    } else {
      setSelected([]);
    }
  };

  const handleSelected = (e, id) => {
    if (e.target.checked) {
      setSelected((x) => [...x, id]);
    } else {
      const newSelelected = selected.filter((i) => i !== id);
      setSelected(newSelelected);
    }
  };

  const handleEditClick = (data) => {
    console.log(data);
    setEditData({
      ...data,
    });
    setShowEditModal(true);
  };
  const onDelete = async () => {
    const res = await axiosInstance.delete(
      "/accessory/delete-items?Ids=" + selected.join(",")
    );
    if (res.data.success) {
      messageApi.open({
        type: "success",
        content: "Thao tác thành công !",
      });
      const newData = data?.filter((i) => !selected.includes(i.MALKDV));
      setData(newData);
      setSelected([]);
    }
  };
  return (
    <>
      <div>
        <div className="search-header">
          <div className="header-receipt-container">
            <h4 className="title-medium">Khách hàng</h4>
            <div className="flex mb-16 al-ct spc-bw">
              <SearchBar />
              <div className="flex">
                <Add onClick={() => setShowAddModal(true)} />
                <Delete
                  disabled={selected.length === 0 ? true : false}
                  onClick={onDelete}
                />
              </div>
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
      <AddCustomerModal
      setVisible={setShowAddModal}
      setData={setData}
    />
    )}
    {showEditModal && (
      <EditCustomerModal
      setVisible={setShowEditModal}
      form={editData}
      setForm={setEditData}
      setData={setData}
     />
      )}
    </>
  );
}
