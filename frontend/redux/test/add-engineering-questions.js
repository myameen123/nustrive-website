import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

export const addEngineeringQuestion = createAsyncThunk(
  "test/addEngineeringQuestion",
  async (data, { rejectWithValue }) => {
    try {
      // console.log(savedQuestions);
      const config = {
        withCredentials: true,
      };
      for (var pair of data.entries()) {
        console.log(pair[0] + " - " + pair[1]);
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/addEngineeringQuestion`,
        data,
        config
      );

      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addEngineeringQuestionSlice = createSlice({
  name: "addEngineeringQuestion",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addEngineeringQuestion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addEngineeringQuestion.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success || action.payload;
      state.error = "";
    });
    builder.addCase(addEngineeringQuestion.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload?.message || action.error.message;
    });
  },
});

export default addEngineeringQuestionSlice.reducer;
