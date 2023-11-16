import { configureStore } from "@reduxjs/toolkit";
import { userContactDetailsReducer } from "./slices/userContactDetails";
import { userOptionsReducer } from "./slices/userOptions";

export const store = configureStore({
  reducer: {
    userOptions: userOptionsReducer,
    userContactDetails: userContactDetailsReducer,
  },
});
