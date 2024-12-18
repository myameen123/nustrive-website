import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  questions: [],
  error: "",
};

if (typeof window !== "undefined") {
  const storedInfo = localStorage.getItem("Test");
  if (storedInfo) {
    initialState.questions = JSON.parse(storedInfo);
  }
}
const saveCurrentTime = () => {
  const currentTime = new Date().getTime();
  localStorage.setItem("startTime", currentTime);
};



export const getTest = createAsyncThunk(
  "test/getTest",
  async (testId, { rejectWithValue }) => {
    try {
      // Check if questions already exist in local storage
      const storedQuestions = localStorage.getItem("Test");
      if (storedQuestions) {
        // console.log("this is in local storage", JSON.parse(storedQuestions));
        return JSON.parse(storedQuestions);
      }
      // console.log("this is in request");
      // If not, fetch questions from the backend
      saveCurrentTime();

      const config = {
        withCredentials: true,
      };
      // console.log('testId in get-test-slice:',testId)
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mock-question/getTest/${testId}`,
        config
      );

      // console.log('response.data in get-test-slice: ', response.data)
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTestSlice = createSlice({
  name: "getTest",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTest.fulfilled, (state, action) => {
      state.loading = false;
      state.questions = action.payload.questions || action.payload;
      // console.log('1.fulfilled')
      state.error = "";
      // Update localStorage on the client-side
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "Test",
          JSON.stringify(action.payload.questions || action.payload)
        );
        // localStorage.setItem('duration', )
      }
    });
    builder.addCase(getTest.rejected, (state, action) => {
      state.loading = false;
      // console.log('2.rejected')
      state.questions = [];
      state.error = action.payload?.message || action.error.message;
    });
  },
});

export default getTestSlice.reducer;
