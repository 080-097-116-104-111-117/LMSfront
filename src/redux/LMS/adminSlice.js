import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiBase from "../common/api";


export const fetchAsyncBooksIssued= createAsyncThunk(
  "books/fetchAsyncBooksIssued",
  async () => {
    const response = await apiBase.get(`/borrowed/`, true).then((response) =>{
      return response;
    }).catch((err) => {
      console.log("err: ", err);
    });
    // console.log("response: ",response.data)
    return response.data;
  }
);

export const fetchAsyncUsers= createAsyncThunk(
  "users/fetchAsyncUsers",
  async () => {
    const response = await apiBase.get(`/register/`, true).then((response) =>{
      return response;
    }).catch((err) => {
      console.log("err: ", err);
    });
    // console.log("response: ",response.data)
    return response.data;
  }
);

export const fetchAsyncCategory= createAsyncThunk(
  "category/fetchAsyncCategory",
  async () => {
    const response = await apiBase.get(`/category/`, true).then((response) =>{
      return response;
    }).catch((err) => {
      console.log("err: ", err);
    });
    // console.log("response: ",response.data)
    return response.data;
  }
);


const initialState = {
    booksIssued : {},
    users : {},
    category:{},
    selectUser: {},
};

const bookIssuedSlice = createSlice({
  name: "booksIssued",
  initialState,
  reducers: {
    removeSelectedBooks: (state) => {
      state.selectBook = {};
    },
  },
  extraReducers: {
    [fetchAsyncBooksIssued.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncBooksIssued.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, books: payload };
    },
    [fetchAsyncBooksIssued.rejected]: (err) => {
      console.log("Rejected! ",err);
    },
    [fetchAsyncUsers.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, users: payload };
    },
    [fetchAsyncCategory.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, category: payload };
    },
    

  },
});

// export const { removeSelectedBooks } = bookSlice.actions;
export const getAllbooksIssued = (state) => state.booksIssued.books;
export const getAllUsers = (state) => state.booksIssued.users;
export const getAllCategory = (state) => state.booksIssued.category;
export default bookIssuedSlice.reducer;

