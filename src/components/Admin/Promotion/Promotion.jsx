import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../../utils/axiosConfig";
import Add from "../../Button/Add";
import Delete from "../../Button/Delete";
import AddPromotionModal from "../../Modal/AddPromotion";
import SearchBar from "../../search/SearchBar";
import Table from "../../Table/Table";
import "./Promotion.css";

const columns = [
  {
    Header: "Mã khuyến mãi",
    accessor: "MAKM"
  },
  {
    Header: "Lí do",
    accessor: "LIDO",
  },
  {
    Header: "Ngày bắt đầu",
    accessor: "NGAYBATDAU",
  },
  {
    Header: "Ngày kết thúc",
    accessor: "NGAYKETTHUC",
  },
];
function Promotion() {
  const [selected, setSelected] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [data, setData] = useState([]);


  let history = useHistory()
  useEffect(() => {
    const getdata = async() =>{
      const res = await axiosInstance.get('/promotion')
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
    console.log(data) 
    history.push('/promotion/detail/' + data.MAKM)
    
  }
  return (
    <>
      <div>
        <div className="search-header">
          <div className="header-receipt-container">
            <h4 className="title-medium">Khuyến mãi</h4>
            <div className="flex mb-16 al-ct spc-bw">
              <SearchBar />
              <div className="flex">
                <Add onClick={() => setShowAddModal(true)} />
                <Delete
                // disabled={selected.length === 0 ? true : false}
                // onClick={onDelete}
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
        <AddPromotionModal
        setVisible={setShowAddModal}
        setData={setData}
      />
      )}

    </>
  );
}

export default Promotion;
