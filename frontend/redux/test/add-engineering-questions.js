import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

export const addEngineeringQuestion = createAsyncThunk(
  "question/addEngineeringQuestion",
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: false,
      };
      console.log('data: ', data);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/addEngineeringQuestion`,
        data,
        config
      );
      console.log('response', response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addEngineeringQuestionSlice = createSlice({
  name: "addEngineeringQuestion",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addEngineeringQuestion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addEngineeringQuestion.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload; //action.payload.success || 
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
