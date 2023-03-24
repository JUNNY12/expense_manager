import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Login from "../page/auth/Login";
import NotFound from "../page/notfound/NotFound";
import Nav from "../component/Nav";
import React, { useEffect, useState } from "react";
import Loader from "../component/Loader";

const LazyHome = React.lazy(() => import('../page/Home/Home'));
const LazyRegister = React.lazy(() => import('../page/auth/Register'));
const LazProfile = React.lazy(() => import('../page/profile/Profile'));
const LazyLogin = React.lazy(() => import('../page/auth/Login'));

let user = false;

function Routes() {
    return [
        {
            path: '/',
            element: <LazyHome />,
            private: true
        },
        {
            path: '/profile',
            element: <LazProfile />,
            private: true
        },
        {
            index: true,
            path: '/login',
            element: <LazyLogin />
        },
        {
            path: '/register',
            element: <LazyRegister />
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]
}

function RoutesConfig() {
    const location = useLocation();
    const navigate = useNavigate();

    const isPrivate = (route) => route.private;

    const [user, setUser] = useState(false);

    const redirect = () => {
        navigate('/login');
    }

    useEffect(() => {
        if (Routes().some(isPrivate) && !user) {
            redirect();
        }
    }, [user]);

    if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/profile') {
        return (
            <div>
                <Outlet />
            </div>
        )
    }

    return (
        <div>
            <Nav />
            <Outlet />
        </div>
    )
}

export { Routes, RoutesConfig };
