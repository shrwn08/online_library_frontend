import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetching all books data
export const fetchBooks = createAsyncThunk(
  "fetchBooks",
  async (_, thunkAPI) => {
    try {
      const response = await axios("http://localhost:8080/api/books");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

//posting books
export const uploadBook = createAsyncThunk(
  "uploadBook",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/upload-book",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

//fetching data using id
export const fetchBookDetail = createAsyncThunk(
  "fetchBookDetail",
  async (id, thunkAPI) => {
    try {
      const response = await axios(`http://localhost:8080/api/book/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    isLoading: true,
    isError: false,
    errorMsg: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload || "Failed to fetch books";
        state.isError = true;
      })
      //Adding cases for uploading books
      .addCase(uploadBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(uploadBook.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload || "Failed to fetch rejected";
        state.isError = true;
      })
      //fetching details of a card
      .addCase(fetchBookDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBookDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(fetchBookDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload || "Failed to fetch rejected";
        state.isError = true;
      });
  },
});

export default booksSlice.reducer;
