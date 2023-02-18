import images from "../../../assets/image";
function DetailCarReceipt() {
  return (
    <>
    
      <form className="form-detail-warranty">
      
        <h4 className="detail-warranty">HOÁ ĐƠN</h4>
        <div className="detail-warranty-desc">
            <div style={{display:"flex"}}>
                <p>Ngày lập hoá đơn:</p>
            </div>
            <p>Tổng tiền dịch vụ:</p>
            <p>Tổng tiền linh kiện:</p>
            <p>Số tiền giảm:</p>
            
        </div>
        <div className="signature">
            <p className="signature-namecus">Ký nhận của khách hàng</p>
            <p className="signature-namesto">Xác nhận cửa hàng</p>
        </div>
      </form>
    </>
  );
}

export default DetailCarReceipt;
