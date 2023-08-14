import { configureStore } from "@reduxjs/toolkit";
import friendsSlice from "./friendContent";



const store = configureStore({
  reducer : {friendsSlice: friendsSlice.reducer}
});

export default store

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;