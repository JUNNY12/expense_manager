import Nav from "./Nav";
import { Outlet } from "react-router-dom";

const SharedNav = () => {
    return (
        <>
        <Nav />
        <Outlet />
        </>
    );
}