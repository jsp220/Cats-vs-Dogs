import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteWithToken = () => {
    let auth = false;
    var token = localStorage.getItem("id_token");
    if (token){
         auth = true;
    }
    return auth ? <Navigate to="/" /> : <Outlet />;
}

export default PrivateRouteWithToken;