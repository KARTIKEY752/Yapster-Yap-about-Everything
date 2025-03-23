import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const BASE_URL = import.meta.env.MODE === "development" ?"http://localhost:5001":"/";
export const useAuthStore = create((set,get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[],
  socket:null,

  checkAuth: async () => {
    try {
      const { data } = await axiosInstance.get("/auth/check");
      set({ authUser: data });

      get().connectSocket()

    } catch (error) {
      console.error("Auth check failed:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const { data: user } = await axiosInstance.post("/auth/signup", data);
      set({ authUser: user });
      toast.success("Account created successfully");
      get().connectSocket()


    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      toast.error(message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const { data: user } = await axiosInstance.post("/auth/login", data);
      set({ authUser: user });
      toast.success("Logged in successfully");

      get().connectSocket()


    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket()

    } catch (error) {
      const message = error.response?.data?.message || "Logout failed";
      toast.error(message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const { data: updatedUser } = await axiosInstance.put(
        "/auth/update-profile",
        data
      );
      
      // Merge existing user data with updates
      set((state) => ({
        authUser: { ...state.authUser, ...updatedUser }
      }));
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
      const message = error.response?.data?.message || "Update failed";
      toast.error(message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },


connectSocket:()=>{
  const {authUser}=get()
  if(!authUser || get().socket?.connected) return;

  const socket=io(BASE_URL,{
    query:{
      userId:authUser._id,
    }
  })
  socket.connect()

  set({socket:socket});

  socket.on("getOnlineUsers", (userIds) => {
    set({ onlineUsers: userIds })
  });

},
disconnectSocket: ()=>{
  if(get().socket?.connected) get().socket.disconnect();
},

  
}));