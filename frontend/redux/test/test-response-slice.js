import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  result: [],
  error: "",
};

export const postTestResponse = createAsyncThunk(
  "test/postTestResponse",
  async (_, { rejectWithValue }) => {
    try {
      const savedQuestions = JSON.parse(localStorage.getItem("questions"));
      const config = {
        withCredentials: true,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/test/testResponse`,
        savedQuestions,
        config
      );

      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const postTestResponseSlice = createSlice({
  name: "postTestResponse",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postTestResponse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postTestResponse.fulfilled, (state, action) => {
      state.loading = false;
      state.result = action.payload.result || action.payload;
      state.error = "";
    });
    builder.addCase(postTestResponse.rejected, (state, action) => {
      state.loading = false;
      state.result = [];
      state.error = action.payload?.message || action.error.message;
    });
  },
});

export default postTestResponseSlice.reducer;
