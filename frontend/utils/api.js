import axios from "axios";
import store from "@/redux/store";
import { clearPersistedState, logoutUser } from "@/redux/auth/logout-slice";
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  withCredentials: true, // Include cookies in requests
});

// Request interceptor to add the access token
console.log("adding request interceptor");
api.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    console.log("error in request interceptor", error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        console.log("Refreshing token");
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        return api(originalRequest);
      } catch (error) {
        console.error("Failed to refresh token", error);

        store.dispatch(clearPersistedState());

        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
