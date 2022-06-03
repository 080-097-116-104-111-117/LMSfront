import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiBase from "../common/api";


export const fetchAsyncBooks = createAsyncThunk(
  "books/fetchAsyncBooks",
  async () => {
    const response = await apiBase.get(`/books/`, true).then((response) =>{
      return response;
    }).catch((err) => {
      console.log("err: ", err);
    });
    // console.log("response: ",response.data)
    return response.data;
  }
);

export const fetchAsyncComments = createAsyncThunk(
  "books/fetchAsyncComments",
  async () => {
    const response = await apiBase.get(`/comment/`, true).then((response) =>{
      return response;
    }).catch((err) => {
      console.log("err: ", err);
    });
    // console.log("response: ",response.data)
    return response.data;
  }
);




export const fetchAsyncBook = createAsyncThunk(
  "book/fetchAsyncBook",
  async (id) => {
    const response = await apiBase.get(`/books/${id}/`, true).then((response) =>{
      console.log("response;",response)
      return response;
    }).catch((err) =>{
      console.error(err);
    });
    return response.data;
  }
);

// export const fetchAsyncSearchBook = createAsyncThunk(
//   "book/fetchAsyncBook",
//   async (book) => {
//     const response = await apiBase.get(`books/search/?search=${book}`, true).then((response) =>{
//       console.log("response;",response)
//       return response;
//     }).catch((err) =>{
//       console.error(err);
//     });
//     return response.data;
//   }
// );

const initialState = {
  books: {},
  comments : {},
  selectBook: {},
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    removeSelectedBooks: (state) => {
      state.selectBook = {};
    },
  },
  extraReducers: {
    [fetchAsyncBooks.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncBooks.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, books: payload };
    },
    [fetchAsyncBooks.rejected]: (err) => {
      console.log("Rejected! ",err);
    },
    // [fetchAsyncShows.fulfilled]: (state, { payload }) => {
    //   console.log("Fetched Successfully!");
    //   return { ...state, shows: payload };
    // },
    [fetchAsyncBook.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, selectBook: payload };
    },
    [fetchAsyncComments.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, comments: payload };
    },
    // [fetchAsyncSearchBook.fulfilled]: (state, { payload }) => {
    //   console.log("Fetched Successfully!");
    //   return { ...state, books: payload };
    // },
  },
});

export const { removeSelectedBooks } = bookSlice.actions;
export const getAllbooks = (state) => state.books.books;
export const getAllComments = (state) => state.books.comments;
export const getSelectedBooks = (state) => state.books.selectBook;
export default bookSlice.reducer;