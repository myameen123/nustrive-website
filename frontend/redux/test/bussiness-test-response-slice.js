import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  result: [],
  error: "",
};

if (typeof window !== "undefined") {
  const storedInfo = localStorage.getItem("result");
  if (storedInfo) {
    initialState.result = JSON.parse(storedInfo);
  }
}
export const businessTestResponse = createAsyncThunk(
  "test/businessTestResponse",
  async (_, { rejectWithValue }) => {
    try {
      const savedQuestions = JSON.parse(localStorage.getItem("businessTest"));
      // console.log(savedQuestions);
      const config = {
        withCredentials: true,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mock-test/businessTestResponse`,
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

export const businessTestResponseSlice = createSlice({
  name: "businessTestResponse",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder.addCase(businessTestResponse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(businessTestResponse.fulfilled, (state, action) => {
      state.loading = false;
      state.result = action.payload.result || action.payload;
      state.error = "";
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "result",
          JSON.stringify(action.payload.result || action.payload)
        );
      }
    });
    builder.addCase(businessTestResponse.rejected, (state, action) => {
      state.loading = false;
      state.result = [];
      state.error = action.payload?.message || action.error.message;
    });
  },
});

export default businessTestResponseSlice.reducer;
