import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ element }) {
    const { user } = useSelector((state) => state.auth); 

    if(!user){
        return <Navigate to="/auth/login" replace />
    }
    return element;
}


export default ProtectedRoute;
