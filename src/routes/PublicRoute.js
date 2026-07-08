import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ element }) => {
    const { user } = useSelector(state => state.auth);

    if(user){
        return <Navigate to="/app" replace />
    }
    return element;
};

export default PublicRoute;
