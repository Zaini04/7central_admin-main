// src/utils/fetcher.js
import Axios from "../config/api";
import { getUser } from "../utils/authLocalStorage"; 

const fetcher = async (url, user) => {
  const token = user?.token || getUser()?.user; 
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};

  const response = await Axios.get(url, config);
  return response.data; 

  
};

export default fetcher;
