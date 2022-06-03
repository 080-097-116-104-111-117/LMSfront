
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Auth from '../redux/common/isAuth'


const PrivateRoute = () => {
    const isAuth = Auth();

    // const auth = false; // determine if authorized, from context or however you're doing it
    // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuth ? <Outlet /> : <Navigate to="/login" />

};

export const PrivateLoginRoute = () => {
    const isAuth = Auth();


    return isAuth ? <Navigate to="/" /> : <Outlet />
};


export const PrivateSigninRoute = () => {
    const isAuth = Auth();
    
    return isAuth ? <Navigate to="/" /> : <Outlet />
};


export const PrivateAdminRoute = () => {
    const isAuth = Auth();
    console.log("isAuth:",isAuth);
    console.log("isAdmin:",isAuth.user.is_superuser);
    
    return isAuth.user.is_superuser ? <Outlet />: <Navigate to="/login" /> 
};

export default PrivateRoute;