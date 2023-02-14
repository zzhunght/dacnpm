import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function SignUp() {
  return (
    <div className='container full-height flex al-ct jt-ct'>
        <div className="bg"></div>
        <div className='auth-wr flex'>
          <div className='form-left'>
          </div>
          <div className="form-right">
            <p className="welcome">Chào mừng bạn đến với trung tâm bảo hành xe máy</p>
            <p className="form-title">Đăng ký</p>
            <input type="text" className="form-input"  placeholder='Họ và Tên'/>
            <input type="text" className="form-input"  placeholder='Số điện thoại'/>
            <input type="text" className="form-input"  placeholder='Tên đăng nhập'/>
            <input type="text" className="form-input"  placeholder='Mật khẩu'/>

            <div className="flex jt-ct">
              <button className="form-submit">Đăng ký</button>

            </div>
            
            <p>Đã có tài khoản? <span className='auth-choose'> <Link to="/login">Đăng nhập</Link></span></p>


          </div>
        </div>
    </div>
  )
}

export default SignUp