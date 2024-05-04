import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo-slice";
import testResponseSlice from "./test/test-response-slice";
import getBusinessTestSlice from "./test/get-business-test-slice";
// import todoSlice from "./test/todo-slice";
// import todoReducer from "./todo-slice";

const store = configureStore({
  reducer: {
    getBusinessTest: getBusinessTestSlice,
    todo: todoSlice,
    testResponse: testResponseSlice,
  },
});
export default store;
