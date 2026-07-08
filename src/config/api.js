import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "redux/actions/authActions";
import { getUser, removeUser } from "utils/authLocalStorage";

 
export const baseURL = process.env.REACT_APP_API_URL;  

const Axios = axios.create({
    baseURL: `${baseURL}/api`,
});

// Add Authorization Header
Axios.interceptors.request.use(
    (config) => {
        if (!navigator.onLine) {
            return Promise.reject(new Error('No internet connection.'));
        }
        const user = getUser();
        if (user) {
            const token = user?.token;
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const useApi = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoggingOut, setIsLoggingOut] = useState(false);  

    useEffect(() => {
        const interceptor = Axios.interceptors.response.use(
            (response) => response,
            (error) => {
                // Logout on unauthorized error
                if (error.response && error.response.status === 401 && !isLoggingOut) {
                    setIsLoggingOut(true);  // Set flag to true when logout starts

                    // Dispatch logout action
                    dispatch(logout(navigate, false)); 
                    removeUser();

                    // You can also add logic to prevent further requests during logout
                }
                return Promise.reject(error);
            }
        );

        return () => {
            // Clean up interceptor on unmount
            Axios.interceptors.response.eject(interceptor);
        };
    }, [dispatch, navigate, isLoggingOut]);

    return Axios;
};

export default Axios;
