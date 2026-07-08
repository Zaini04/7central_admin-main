import toast from "react-hot-toast";
import returnErrorMsg from "./returnErrorMsg";

const toastError = (err) => {
    console.log({ error : err })
    return toast.error(returnErrorMsg(err));
}

export default toastError;