import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "../models";

export const getPosts = createAsyncThunk<Post[]>("posts/getPosts", async () => {
  const { data } = await axios.get<Post[]>("http://localhost:3001/posts");

  return data;
});
export const deletePost = createAsyncThunk<
  Post,
  { id: number; indexPost: number }
>("posts/deletePost", async ({ id }, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete<Post>(
      `http://localhost:3001/posts/${id}`
    );

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const addPost = createAsyncThunk<
  Post,
  Pick<Post, "name" | "description">
>("posts/addPost", async (newPost, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<Post>(
      `http://localhost:3001/posts/`,
      newPost
    );

    return data;
  } catch (error) {
    console.log(error, "response: ", error);
    return rejectWithValue(error);
  }
});

interface StatePost {
  posts: Post[];
  isLoading: boolean;
  isCreating: boolean;
  isDeleting: { id: number; status: boolean }[];
  isError: boolean;
  error: any;
}

const initialState: StatePost = {
  posts: [],
  isLoading: false,
  isCreating: false,
  isDeleting: [],
  isError: false,
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Posts
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
      state.isDeleting = action.payload.map((p) => ({
        id: p.id,
        status: false,
      }));
    });

    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    });

    // Add Post
    builder.addCase(addPost.fulfilled, (state, { payload }) => {
      state.posts.unshift(payload);
      state.isCreating = false;
      state.isDeleting.push({ id: payload.id, status: false });
    });

    builder.addCase(addPost.pending, (state) => {
      state.isCreating = true;
    });
    builder.addCase(addPost.rejected, (state, action) => {
      state.isError = true;
      state.isCreating = false;
      state.error = action.payload;
    });

    // Delete Post
    builder.addCase(deletePost.fulfilled, (state, { meta: { arg } }) => {
      state.posts.splice(arg.indexPost, 1);
      state.isDeleting.splice(arg.indexPost, 1);
    });

    builder.addCase(deletePost.pending, (state, { meta: { arg } }) => {
      state.isDeleting[arg.indexPost].status = true;
    });

    builder.addCase(deletePost.rejected, (state, action) => {
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export default postsSlice.reducer;
