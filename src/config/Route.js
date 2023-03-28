import { useRoutes } from "react-router-dom";
import NotFound from "../page/notfound/NotFound";
import React from "react";
const LazyHome = React.lazy(() => import('../page/Home/Home'));
const LazyRegister = React.lazy(() => import('../page/auth/Register'));
const LazProfile = React.lazy(() => import('../page/profile/Profile'));
const LazyLogin = React.lazy(() => import('../page/auth/Login'));




export function Route(){
    return useRoutes([
        {
            path: '/',
            element: <LazyHome />,
        },
        {
            path: '/profile',
            element: <LazProfile />,
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

    ])
}