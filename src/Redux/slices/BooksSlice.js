import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const config = 'https://online-library-backend-y46c.onrender.com';

//fetching all books data
export const fetchBooks = createAsyncThunk(
  "fetchBooks",
  async (category, thunkAPI) => {
    try {
      const response = await axios(`${config}/api/books`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

//fetching Category books data
export const fetchCategoryBooks = createAsyncThunk(
  "fetchCategoryBooks",
  async (category, thunkAPI) => {
    try {
      const response = await axios(
        `${config}/api/books?category=${category}`,
      );
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
        `${config}/api/upload-book`,
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
      const response = await axios(`${config}/api/book/${id}`);
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
    categoryBook: [],
    detailedBook: null,
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
        state.detailedBook = action.payload;
        localStorage.setItem("book", JSON.stringify(action.payload));
      })
      .addCase(fetchBookDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload || "Failed to fetch rejected";
        state.isError = true;
      })

      //fetch Category books

      .addCase(fetchCategoryBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoryBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryBook = action.payload;
      })
      .addCase(fetchCategoryBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMsg = action.payload || "Failed to fetch rejected";
        state.isError = true;
      });
  },
});

export default booksSlice.reducer;
