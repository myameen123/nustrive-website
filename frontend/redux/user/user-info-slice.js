import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "@/utils/api";
let initialState = {
  loading: false,
  myInfo: {},
  message: "",
  error: {},
};

export const userInfo = createAsyncThunk(
  "user/userInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/get-me");
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          await api.post("/auth/refresh-token", {}, { withCredentials: true });
          const retryResponse = await api.get("/auth/get-me");
          return retryResponse.data;
        } catch (retryError) {
          return rejectWithValue(retryError.response.data);
        }
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.myInfo = action.payload.data.user;
      state.message = action.payload.message;
      state.error = "";
    });
    builder.addCase(userInfo.rejected, (state, action) => {
      state.loading = false;
      state.myInfo = {};
      state.error = action.payload?.error || action.error;
    });
  },
});

export default userInfoSlice.reducer;
