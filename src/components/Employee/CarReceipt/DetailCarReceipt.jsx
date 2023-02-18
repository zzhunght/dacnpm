import images from "../../../assets/image";
function DetailCarReceipt() {
  return (
    <>
    
      <form className="form-detail-warranty">
      
        <h4 className="detail-warranty">PHIẾU BẢO HÀNH XE</h4>
        <div className="detail-warranty-desc">
            <div style={{display:"flex"}}>
                <h6>Thời hạn sử dụng:</h6>
                <p style={{marginTop:'-16px'}}>Từ ngày:....Đến ngày....</p>
            </div>
            <p>Tên cửa hàng:</p>
            <p>Biển số xe:</p>
            <p>Tình trạng:</p>
            <p>Mã nhân viên:</p>
            <p>Mã khách hàng:</p>
            {/* <img className="img-detail" src={images.logo}/> */}
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
