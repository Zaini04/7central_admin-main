import Axios from "config/api";
import toast from "react-hot-toast";
import { clearErrors, setError, setLoading, setUser,setUpdatePassword } from "redux/slices/authSlice";
import { removeUser, storeUser,getUser } from "utils/authLocalStorage";
import returnErrorMsg from "utils/returnErrorMsg";
import toastError from "utils/toastError";

export const login = (data , navigate , resetForm ) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const { data : { data : { message , doc } } } = await Axios.post('/user/login' , data );
        toast.success(message);
        dispatch(setUser({...doc}));
        storeUser(doc);
        navigate(`/app`);
        resetForm();
        dispatch(clearErrors())
        dispatch(setLoading(false));
    } catch (err) {
        dispatch(setLoading(false));
        dispatch(setError({ login : returnErrorMsg(err)}))
    }
}


export const logout = (navigate , showToast = true) => async(dispatch) => {
    dispatch(setLoading(true));
    try {
        await Axios('/user/logout');
        navigate('/auth/login');
        dispatch(setUser(null));
        removeUser('user');
        dispatch(setLoading(false));
        if(showToast){
            toast.success('Logged out successfully.')
        }
    } catch (err) {
        dispatch(setLoading(false));
        toastError(err);
    }
}



export const updateUserPassword = (data,navigate, ) => async (dispatch) => {
  try {
    dispatch(setUpdatePassword(true));

    const user = getUser();
    const token = user;
    if (!token) throw new Error("User token not found.");

    const {
      data: {
        data: { message },
      },
    } = await Axios.patch(`/user/update-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setUpdatePassword(false));

      dispatch(setUser(null));
    removeUser();
        navigate("/auth/login");
           toast.success(message);
  } catch (err) {
    dispatch(setUpdatePassword(false));
    console.error("Update password error", err);
    toast.error(
      err?.response?.data?.data?.message || err?.message || "Something went wrong."
    );
  }
};
