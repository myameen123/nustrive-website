import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
  loading: false,
  user: {},
  isAuthenticated: false,
  error: {},
};
if (typeof window !== "undefined") {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    initialState = JSON.parse(userInfo);
  }
}

export const loginUser = createAsyncThunk(
  "products/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "content-Type": "application/json" },
        withCredentials: true,
        //  credentials: 'include'
      };
      const response = await axios.post(
        // `https://website-backend-eight.vercel.app/api/v1/login`,
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        userData,
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.success;
      state.error = "";
      // Update localStorage on the client-side
      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(state));
      }
      //   console.log(action);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log("in eroor...........................");
      console.log(action.payload.message);
      state.loading = false;
      state.user = {};
      state.isAuthenticated = false;
      state.error = action.payload?.error || action.error;
    });
  },
});

export default loginUserSlice.reducer;
