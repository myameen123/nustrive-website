import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useParams } from "next/navigation";

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

// const params = useParams();

export const testResponse = createAsyncThunk(
  "test/testResponse",
  async (testId, { rejectWithValue }) => {
    try {
      const savedQuestions = JSON.parse(
        localStorage.getItem("test")
      );
      // console.log(savedQuestions);
      const config = {
        withCredentials: true,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/testResponse/${testId}`,
        savedQuestions,
        config
      );
      console.log('response in test-response-slice: ', response.data)
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const testResponseSlice = createSlice({
  name: "testResponse",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder.addCase(testResponse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(testResponse.fulfilled, (state, action) => {
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
    builder.addCase(testResponse.rejected, (state, action) => {
      state.loading = false;
      state.result = [];
      state.error = action.payload?.message || action.error.message;
    });
  },
});

export default testResponseSlice.reducer;
