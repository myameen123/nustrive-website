"use client";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";

export function ReduxProviders({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

// "use client";
// import React from "react";

// import { Provider } from "react-redux";
// import store from "./store";

// export function ReduxProviders({ children }) {
//   return <Provider store={store}>{children}</Provider>;
// }
