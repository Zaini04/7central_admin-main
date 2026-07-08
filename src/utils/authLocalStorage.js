import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_AUTH_SECRET_KEY; // Ye key secure rakhen aur unique ho

// 1. Store User (Encrypt and save to localStorage)
export const storeUser = (user) => {
    try {
        const encryptedUser = CryptoJS.AES.encrypt(
            JSON.stringify(user),
            SECRET_KEY
        ).toString();
        localStorage.setItem("user", encryptedUser);
    } catch (error) {
        console.error("Error storing user:", error);
    }
};

// 2. Get User (Decrypt and retrieve from localStorage)
export const getUser = () => {
    try {
        const encryptedUser = localStorage.getItem("user");
        if (!encryptedUser) return null;
        const bytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
        const decryptedUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedUser;
    } catch (error) {
        console.error("Error getting user:", error);
        return null;
    }
};

// 3. Remove User (Remove user from localStorage)
export const removeUser = () => {
    try {
        localStorage.removeItem("user");
    } catch (error) {
        console.error("Error removing user:", error);
    }
};
