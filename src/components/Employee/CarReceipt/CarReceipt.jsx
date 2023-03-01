import {
    faCircleXmark,
    faEye,
    faFloppyDisk,
    faMagnifyingGlass,
    faPenToSquare,
    faSpinner,
    faTrashCan,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import React, { useEffect, useState } from "react";
  import { Form, Spinner } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../../utils/axiosConfig";
import Add from "../../Button/Add";
import Delete from "../../Button/Delete";
import AddCarReceiptModal from "../../Modal/AddCarReceipt";
import SearchBar from "../../search/SearchBar";
import Table from "../../Table/Table";
  import "./CarReceipt.css";

  const columns = [
    {
      Header: "ID",
      accessor: "MAPN"
    },
    {
      Header: "Ngày nhận",
      accessor: "NGAYNHAN"
    },
    {
      Header: "Biển số xe",
      accessor: "BIENSOXE"
    },
    {
      Header: "Khách hàng",
      accessor: data => `${data?.MAKH_KHACHHANG?.HO} ${data?.MAKH_KHACHHANG?.TEN}`
    },
  ]

  function CarReceipt() {
    const [selected, setSelected] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState({});
    const [data, setData] = useState([]);

    const history = useHistory()

    useEffect(() => {
      const getdata = async() =>{
        const res = await axiosInstance.get('/receipt')
        const data = res.data
        if(data.success) {
          setData(data.items)
        }
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
      history.push('/carreceipt/detail/' + data.MAPN)
    }
    const onDelete = async () => {
      const res = await axiosInstance.delete(
        "/receipt?Ids=" + selected.join(",")
      );
      if (res.data.success) {
        // messageApi.open({
        //   type: "success",
        //   content: "Thao tác thành công !",
        // });
        const newData = data?.filter((i) => !selected.includes(i.MALKDV));
        setData(newData);
        setSelected([]);
      }
    };
    return (
        <div>
          <div className="search-header">
            <div className="header-receipt-container">
              <h4 className="title-medium">Phiếu nhận xe</h4>
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
            <AddCarReceiptModal
            setVisible={setShowAddModal}
            setData={setData}
          />
          )}
        </div>
      );
}

export default CarReceipt;