import { configureStore } from "@reduxjs/toolkit";
import BooksSlice from "./slices/BooksSlice.js";
import booksReducer from "./slices/BooksSlice.js";

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});
