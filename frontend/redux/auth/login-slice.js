import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "@/utils/api";
let initialState = {
  loading: false,
  user: {},
  isAuthenticated: false,
  message: "",
  error: "",
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "content-Type": "application/json" },
      };
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        userData,
        config
      );

      return response.data;
    } catch (error) {
      console.log("in try of login slice", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.message = action.payload.message;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {};
      state.isAuthenticated = false;
      console.log("action...", action);
      state.error = action.payload?.message || action.error;
    });
  },
});

export default loginUserSlice.reducer;
