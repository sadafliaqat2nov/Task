import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import Api from '../../services/api';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (params, thunkAPI) => {
    const api = Api.create();
    const getAllPosts = await api
      .getPosts()
      .then(data => {
        return data;
      })
      .catch(error => {
        thunkAPI.rejectWithValue(error?.data || error);
      });
    return getAllPosts;
  },
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {loading: false, posts: []},
  reducers: {
    showLoader: (state, action) => {
      state.loading = true;
    },
    hideLoader: (state, action) => {
      state.loading = false;
    },
  },
  extraReducers: {
    [getPosts.pending]: (state, {payload}) => {
      state.posts = [];
      state.loading = true;
    },
    [getPosts.fulfilled]: (state, {payload}) => {
      state.posts = payload;
      state.loading = false;
    },
    [getPosts.rejected]: (state, {payload}) => {
      state.posts = [];
      state.loading = false;
    },
  },
});

export const {showLoader, hideLoader} = postsSlice.actions;

export default postsSlice.reducer;
