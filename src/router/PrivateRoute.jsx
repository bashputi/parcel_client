import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading) return <div className="flex justify-center my-10"><span className="loading loading-spinner text-warning"></span></div> ;

    if(!user?.email) {
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;