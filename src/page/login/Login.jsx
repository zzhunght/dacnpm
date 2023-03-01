import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Loading from '../../components/LoadingScreen/Loading'
import { AuthContext } from '../../context/AuthContext'
import './style.css'

function Login() {
  const [form,setForm] = useState({
    TENTK:'',
    MATKHAU: ''
  })

  const {login} = useContext(AuthContext)

  let history = useHistory()
  const onLogin = async () => {
    const res = await login(form)
    if(res === true) return history.push('/')
  }

  const onChange = e => {
    setForm({
      ...form,
      [e.target.name] : e.target.value
    })
  }
  return (
    <>
    <div className='container full-height flex al-ct jt-ct'>
        <div className="bg"></div>
        <div className='auth-wr flex'>
          <div className='form-left'>
          </div>
          <div className="form-right">
            <p className="welcome">Chào mừng bạn đến với trung tâm bảo hành xe máy</p>
            <p className="form-title">Đăng nhập</p>
            <input type="text"
             className="form-input" 
             placeholder='Tên đăng nhập' 
             name='TENTK'
             value={form.TENTK}
             onChange={onChange}
            />
            <input
             type="password" 
             className="form-input"  
             placeholder='Mật khẩu'
             value={form.MATKHAU}
             name="MATKHAU"
             onChange={onChange}
            />

            <div className="flex jt-ct">
              <button className="form-submit" onClick={onLogin}>Đăng nhập</button>

            </div>
            <p>Chưa có tài khoản? <span className='auth-choose'> <Link to="/signup">Đăng ký</Link></span></p>
          </div>
        </div>
    </div>
    </>
  )
}

export default Login