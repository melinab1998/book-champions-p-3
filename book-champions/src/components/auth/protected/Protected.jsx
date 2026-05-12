import { Navigate, Outlet } from "react-router";
import {AuthenticationContext} from "../../services/auth/authContext"
import { useContext } from "react";
import { isTokenValid } from "../../services/auth/authHelpers";

const Protected = () => {

    const {token} = useContext(AuthenticationContext);

    if (!isTokenValid(token)){
        return <Navigate to="/login" replace />;
    }
    return <Outlet/>;
}

export default Protected