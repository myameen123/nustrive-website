import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  questions: [],
  error: "",
};

if (typeof window !== "undefined") {
  const storedInfo = localStorage.getItem("businessTest");
  if (storedInfo) {
    initialState.questions = JSON.parse(storedInfo);
  }
}
const saveCurrentTime = () => {
  const currentTime = new Date().getTime();
  localStorage.setItem("startTime", currentTime);
  console.log("this is the current time", currentTime);
};

export const getBusinessTest = createAsyncThunk(
  "test/getBusinessTest",
  async (_, { rejectWithValue }) => {
    try {
      // Check if questions already exist in local storage
      const storedQuestions = localStorage.getItem("businessTest");
      if (storedQuestions) {
        console.log("this is in local storage", JSON.parse(storedQuestions));
        return JSON.parse(storedQuestions);
      }
      // console.log("this is in request");
      // If not, fetch questions from the backend
      saveCurrentTime();

      const config = {
        withCredentials: true,
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mock-test/getBusinessTest`,
        config
      );

      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getBusinessTestSlice = createSlice({
  name: "getBusinessTest",
  initialState,
  // reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBusinessTest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBusinessTest.fulfilled, (state, action) => {
      state.loading = false;
      state.questions = action.payload.questions || action.payload;
      state.error = "";
      // Update localStorage on the client-side
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "businessTest",
          JSON.stringify(action.payload.questions || action.payload)
        );
      }
    });
    builder.addCase(getBusinessTest.rejected, (state, action) => {
      state.loading = false;
      state.questions = [];
      state.error = action.payload?.message || action.error.message;
    });
  },
});

export default getBusinessTestSlice.reducer;
