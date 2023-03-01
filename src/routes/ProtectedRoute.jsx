import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {Redirect, Route} from 'react-router-dom'
import Loading from "../components/LoadingScreen/Loading";

function ProtectedRoute({children}) {

    const {isLoading, isAuthenticated} = useContext(AuthContext)

    return (
        <>
        {isLoading?(

            <Loading />
        ) : isAuthenticated ? (
            <>
            {children}
            </>
        ) : (
            <>
                <Redirect to="/login" />;
            </>
        )}
        </>
    )
}

export default ProtectedRoute;
