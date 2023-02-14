import { createContext, useState } from "react";


export const AuthContext = createContext()



const AuthContextProvider = ({children}) => {
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    

    const value = {
        isAuthenticated,
        setIsAuthenticated
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
