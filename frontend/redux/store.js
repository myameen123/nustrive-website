

import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import todoSlice from "./todo-slice";

import getBusinessTestSlice from "./test/get-business-test-slice";
import businessTestResponse from "./test/bussiness-test-response-slice";
import addBuisnessQuestionSlice from "./test/add-business-questions";

import getEngineeringTest from "./test/get-engineering-test-slice";
import engineeringTestResponse from "./test/engineering-test-response-slice";
import addEngineeringQuestionSlice from "./test/add-engineering-questions";

import loginUserSlice from "./auth/login-slice";
import logoutSlice from "./auth/logout-slice";
import userInfoSlice from "./user/user-info-slice";

// Create the root reducer
const rootReducer = combineReducers({
  getBusinessTest: getBusinessTestSlice,
  getEngineeringTest: getEngineeringTest,
  todo: todoSlice,
  businessTestResponse: businessTestResponse,
  engineeringTestResponse: engineeringTestResponse,
  addNewEngineeringQuestion: addEngineeringQuestionSlice,
  addNewBusinessQuestion: addBuisnessQuestionSlice,
  userLogin: loginUserSlice,
  myInfo: userInfoSlice,
  logout: logoutSlice,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userLogin"], // Persist these slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
