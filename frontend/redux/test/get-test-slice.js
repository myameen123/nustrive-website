import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  questions: [],
  error: "",
};

if (typeof window !== "undefined") {
  const storedInfo = localStorage.getItem("test");
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
      console.log('1. get-test-slice')
      const storedQuestions = localStorage.getItem("test");
      if (storedQuestions) {
        console.log('2. get-test-slice')
        // console.log("this is in local storage", JSON.parse(storedQuestions));
        return JSON.parse(storedQuestions);
      }
      // console.log("this is in request");
      // If not, fetch questions from the backend
      saveCurrentTime();

      const config = {
        withCredentials: true,
      };
      console.log('3. get-test-slice')
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/question/getTest/${testId}`,
        config
      );

      const data = response.data;
      // const response = d_response.filter(item=>item.test===testId)
      console.log('response.data in get-test-slice', data)
      return data;
    } catch (error) {
      console.log('4. get-test-slice')
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
      console.log('5. get-test-slice')
    });
    builder.addCase(getTest.fulfilled, (state, action) => {
      state.loading = false;
      state.questions = action.payload.questions || action.payload;
      state.error = "";
      // Update localStorage on the client-side
      console.log('6. get-test-slice')
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "test",
          JSON.stringify(action.payload.questions || action.payload)
        );
      }
    });
    builder.addCase(getTest.rejected, (state, action) => {
      console.log('7. get-test-slice')
      state.loading = false;
      state.questions = [];
      state.error = action.payload?.message || action.error.message;
    });
  },
});

export default getTestSlice.reducer;
