import{create} from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast";
export const useAuthStore=create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    checkAuth:async()=>{
        try {
            const res= await axiosInstance.get("/auth/check")
            set({authUser:res.data})
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
        } catch (error) {
            console.log("Signup Error:", error);
            const message =
              error?.response?.data?.message || error?.message || "Something went wrong!";
            toast.error(message);
          }finally {
          set({ isSigningUp: false });
        }
      },
      login: async (data) => {
        set({ isLoggingIn: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          console.log(res)
          set({ authUser: res.data });
          toast.success("Log IN successfully");
        } catch (error) {
            console.log("Login Error:", error);
            const message =
              error?.response?.data?.message || error?.message || "Something went wrong!";
            toast.error(message);
          }finally {
          set({ isLoggingIn: false });
        }
      },
      updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update-profile", data);
          console.log(res)
          set({ authUser: res.data }); // Update global authUser after profile update
          toast.success("Profile updated successfully");
        } catch (error) {
          toast.error(error?.response?.data?.message || "Profile update failed");
        } finally {
          set({ isUpdatingProfile: false });
        }
      },
    }));