import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import {AuthenticationContext} from "../../services/auth/authContext"
import { isTokenValid } from "../../services/auth/authHelpers";

const Protected = () => {

    const {token} = useContext(AuthenticationContext);

    if (!isTokenValid(token)) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet/>;
};

export default Protected