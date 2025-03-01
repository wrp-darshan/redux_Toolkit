import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducer/UserSlice";
import popupReducer from "./Reducer/PopUpSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
    popup: popupReducer,
  },
});

export default store;
