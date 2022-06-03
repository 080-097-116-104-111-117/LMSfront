import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./LMS/bookSlice";
import bookIssuedSlice from "./LMS/adminSlice";


const store = configureStore({
  reducer: {
    books: booksReducer,
    booksIssued: bookIssuedSlice,
  },
});
export default store;