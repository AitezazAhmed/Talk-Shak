import{create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";
import {io} from "socket.io-client"


export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    onlineUsers: [],
    isCheckingAuth:true,
    socket:null,
  

    checkAuth:async()=>{
        try {
            const res= await axiosInstance.get("/auth/check")
            set({authUser:res.data})
            get().connectSocket();
        } catch (error) {
            set({authUser:null})
        }
        finally{
            set({ isCheckingAuth: false })
        }
    },
    signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ authUser: res.data });
          toast.success("Account created successfully");
          get().connectSocket();
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || "Something went wrong!";
            toast.error(message);
          }finally {
          set({ isSigningUp: false });
        }
      },
      login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({ authUser: res.data });

          toast.success("Log IN successfully");
          get().connectSocket();
        } catch (error) {
            console.log("Login Error:", error);
            const message =
              error?.response?.data?.message || error?.message || "Something went wrong!";
            toast.error(message);
          }finally {
          set({ isLoggingIn: false });
        }
      },
      logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
          get().disconnectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
   
      updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update-profile", data);
          console.log(res.data)
          set({ authUser: res.data }); // Update global authUser after profile update
          toast.success("Profile updated successfully");
        } catch (error) {
          toast.error(error?.response?.data?.message || "Profile update failed");
        } finally {
          set({ isUpdatingProfile: false });
        }
      },
      connectSocket:()=>{
        const {authUser}=get()
        if(!authUser || get().socket?.connected) return;
       const socket = io("https://talk-shak-8.onrender.com", {
  query: { userId: authUser._id },
  withCredentials: true,
  transports: ["polling"],
});
        socket.connect()
        set({ socket:socket });
        socket.on("getOnlineUsers", (userIds) => {
          set({ onlineUsers: userIds });
        });
      },
      disconnectSocket:()=>{
      if(get().socket?.connected) get().socket.disconnect()
      }
    }));
