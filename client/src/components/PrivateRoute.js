import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    let auth = false;
    var token = localStorage.getItem("id_token");
    if (token){
         auth = true;
    }
    return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;