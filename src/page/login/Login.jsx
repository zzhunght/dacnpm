import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './style.css'

function Login() {
  const {setIsAuthenticated} = useContext(AuthContext)

  const onLogin = () => {
    setIsAuthenticated(true)
  }


  return (
    <div className='container full-height flex al-ct jt-ct'>
        <div className="bg"></div>
        <div className='auth-wr flex'>
          <div className='form-left'>
          </div>
          <div className="form-right">
            <p className="welcome">Chào mừng bạn đến với trung tâm bảo hành xe máy</p>
            <p className="form-title">Đăng nhập</p>
            <input type="text" className="form-input"  placeholder='Tên đăng nhập'/>
            <input type="text" className="form-input"  placeholder='Mật khẩu'/>

            <div className="flex jt-ct">
              <button className="form-submit" onClick={onLogin}>Đăng nhập</button>

            </div>
            <p>Chưa có tài khoản? <span className='auth-choose'> <Link to="/signup">Đăng ký</Link></span></p>
          </div>
        </div>
    </div>
  )
}

export default Login