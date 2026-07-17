import Axios from "config/api";

/**
 * Captured file (base64) ko server pe upload karke real URL (string) return karta hai.
 * ⚠️ Endpoint "/upload" aur response shape ek placeholder hai — jo bhi actual
 * upload route/response format aapke backend mein hai, usse yahan match kar lena
 * (wahi jo "capture-image" control internally use karta hai).
 */
export const uploadAttachment = async (file) => {
  const fileObj = Array.isArray(file) ? file[0] : file;
  if (!fileObj?.base64) throw new Error("No file selected");

  const { data } = await Axios.post("/upload", {
    file: fileObj.base64,
    fileName: fileObj.fileName,
    fileType: fileObj.fileType,
  });

  // response shape confirm karke adjust karo
  return data?.data?.url || data?.url;
};