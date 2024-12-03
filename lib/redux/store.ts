import { configureStore } from "@reduxjs/toolkit";
import checklistReducer from "@/lib/redux/checklistSlice";

export const store = configureStore({
  reducer: {
    checklist: checklistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
