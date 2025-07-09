import axios from "axios"
import useAuthStore from "../Zustand_State/AuthStore"; // <-- add this import
import toast from "react-hot-toast";

export const axiosInstance=axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/codetodoc`, // Append /api/codetodoc
    withCredentials:true,
})

// This is Used to handle 401 and 403 errors globally
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Automatically log out on expired/invalid token
            toast.error("Session expired. Please log in again.");
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);