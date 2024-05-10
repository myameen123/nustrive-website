import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

export const addBuisnessQuestion = createAsyncThunk(
  "test/addBuisnessQuestion",
  async (data, { rejectWithValue }) => {
    try {
      // console.log(savedQuestions);
      const config = {
        withCredentials: true,
      };
      //   for (var pair of data.entries()) {
      //     // console.log(pair[0] + " - " + pair[1]);
      //   }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/addBusinessQuestion`,
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

export const addBuisnessQuestionSlice = createSlice({
  name: "addBuisnessQuestion",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addBuisnessQuestion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBuisnessQuestion.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success || action.payload;
      state.error = "";
    });
    builder.addCase(addBuisnessQuestion.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload?.message || action.error.message;
    });
  },
});

export default addBuisnessQuestionSlice.reducer;
