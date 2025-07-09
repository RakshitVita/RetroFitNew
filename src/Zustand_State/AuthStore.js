import { create } from "zustand";
import { axiosInstance } from "../AxiosInstance/axios_instance";
import useUserStore from "./UserStore";
import toast from "react-hot-toast";
import Cookies from "js-cookie"

const useAuthStore = create((set) => (
    {
        // authUser: {
        //     name: "John Doe",
        //     email: "123@gmail.com",
        //     picture: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
        // },
        authUser: null,
        isChecking: false,
        isLoggingIn: false,

        checkAuth: async () => {

            set({ isChecking: true });
            try {
                const token = Cookies.get("access_token");
                const userCookie = Cookies.get("user");
                if (token && userCookie) {
                    set({ authUser: JSON.parse(userCookie), isChecking: false });
                    return;
                }
                // If no user or token, clear authUser
                set({ authUser: null, isChecking: false });
                Cookies.remove("user");
                Cookies.remove("access_token");
            } catch (error) {
                set({ authUser: null, isChecking: false });
                Cookies.remove("user");
                Cookies.remove("access_token");
            }
        },
        signup: async (data) => {
            set({ isLoggingIn: true });
            try {
                const res = await axiosInstance.post("/signup", { id_token: data });
                set({ authUser: res.data.user });
                Cookies.set("access_token", res.data.access_token, {
                    path: "/",
                    secure: true,
                    sameSite: "strict",
                    expires: 7
                });
                Cookies.set("user", JSON.stringify(res.data.user), {
                    path: "/",
                    secure: true,
                    sameSite: "strict",
                    expires: 7
                });

                set({ authUser: res.data.user, isLoggingIn: false });
                // set({ authUser: data });
                // Cookies.set("access_token", data, {
                //     path: "/",
                //     secure: true,
                //     sameSite: "strict",
                //     expires: 7
                // });
                toast.success("Logged in successfully");
            } catch (error) {
                const errData = error.response?.data;
                const errorMsg = errData?.error || errData?.message || "Failed Sign up";
                toast.error(errorMsg);
                set({ authUser: null, isChecking: false });
            }
        },

        logout: async () => {
            try {
                // await axiosInstance.post("/auth/logout");
                set({ authUser: null });
                Cookies.remove('access_token');
                Cookies.remove('user');
                useUserStore.getState().resetUserState();
                toast.success("Logged out successfully");
            } catch (error) {
                toast.error(error.response.data.message);
            }
        },

    }));

export default useAuthStore;