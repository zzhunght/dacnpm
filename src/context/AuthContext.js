import { message } from "antd";
import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";


export const AuthContext = createContext()



const AuthContextProvider = ({children}) => {
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const [isLoading,setLoading] = useState(true)
    const [user,setUser] = useState({

    })
    const history = useHistory()
    const [messageApi, contextHolder] = message.useMessage();

    
    const login = async (form) => {
        try {
            const res = await axiosInstance.post('/staff/login',form)
            const data = res.data
            if(data.success) {
                setIsAuthenticated(true)
                setUser(data.user)
                setLoading(false)

                localStorage.setItem('auth',true)
                localStorage.setItem('user', JSON.stringify(data.user))
            }
            return true
        } catch (error) {
            setIsAuthenticated(false)
            setLoading(false)
            setUser({})
            return false

        }
    }
    

    const loadUser = () => {
        const user = localStorage.getItem('user')
        const isAuthenticated = localStorage.getItem('auth')
        if (isAuthenticated && user) {
            setIsAuthenticated(true)
            setLoading(false)
            setUser(JSON.parse(user))
        }
        else {
            setLoading(false)
            localStorage.removeItem('auth')
            localStorage.removeItem('user')
        }

    }


    const logOut = () =>{
        localStorage.removeItem('auth')
        localStorage.removeItem('user')
        history.push('/login')
    }


    useEffect(()=>{
        loadUser()
    },[])


    const value = {
        isAuthenticated,
        setIsAuthenticated,
        messageApi,
        login,
        isLoading,
        user,
        logOut
    }
    return (
        <AuthContext.Provider value={value}>
            {contextHolder}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
