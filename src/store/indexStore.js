import { configureStore } from "@reduxjs/toolkit";
import friendsSlice from "./friendContent";



const store = configureStore({
  reducer : {friendsSlice: friendsSlice.reducer}
});

export default store