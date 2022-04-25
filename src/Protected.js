import React from 'react';
import { Navigate, Outlet} from 'react-router-dom';


const useAuth = () => {
    const user = localStorage.getItem('user-info');
    return user;
}


const Protected = () =>  {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default Protected;