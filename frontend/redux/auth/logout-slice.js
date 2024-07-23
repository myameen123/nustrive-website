// logout-slice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/utils/api";
// import { persistor } from "../store"; // Import the persistor from your store configuration
import storage from "redux-persist/lib/storage";
import { persistor } from "../store";
const initialState = {
  loading: false,
  message: "",
  error: null,
};

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (userId, { rejectWithValue }) => {
    console.log(userId);
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        { userId }, // Ensure userId is sent as part of a JSON object
        config
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const logoutUserSlice = createSlice({
  name: "logoutUser",
  initialState,
  reducers: {
    clearPersistedState: async () => {
      //   console.log("in clearance");
      await storage.removeItem("persist:root");
      await persistor.purge(); // Purge all persisted state
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
      console.log(action);
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      console.log("error");
      console.log(action);
      state.loading = false;
      state.message = "";
      state.error = action.payload?.error || action.error.message;
    });
  },
});

export const { clearPersistedState } = logoutUserSlice.actions;

export default logoutUserSlice.reducer;
