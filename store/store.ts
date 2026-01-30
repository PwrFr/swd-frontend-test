import { configureStore } from "@reduxjs/toolkit";
import formDataSlice from "./formData";

export const store = configureStore({
  reducer: {
    formData: formDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
