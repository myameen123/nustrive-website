import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todo-slice";
// import testResponseSlice from "./test/test-response-slice";
import getBusinessTestSlice from "./test/get-business-test-slice";
import businessTestResponse from "./test/bussiness-test-response-slice";
import getEngineeringTest from "./test/get-engineering-test-slice";
import engineeringTestResponse from "./test/engineering-test-response-slice";
// import todoSlice from "./test/todo-slice";
// import todoReducer from "./todo-slice";

const store = configureStore({
  reducer: {
    getBusinessTest: getBusinessTestSlice,
    getEngineeringTest: getEngineeringTest,
    todo: todoSlice,
    // testResponse: testResponseSlice,
    businessTestResponse: businessTestResponse,
    engineeringTestResponse: engineeringTestResponse,
  },
});
export default store;
