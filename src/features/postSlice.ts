// src/features/postSlice.ts
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Post interface
export interface Post {
  _id: string;
  name: string;
  location: string;
  image: string;
}

// State interface
interface PostState {
  isLoading: boolean;
  posts: Post[];
  error: string | null;
}

// Initial state
const initialState: PostState = {
  isLoading: false,
  posts: [],
  error: null,
};

// =======================
// 1️⃣ Fetch posts
// =======================
export const fetchPost = createAsyncThunk<Post[]>(
  "posts/fetchPost",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://southeast-asia-server-three.vercel.app/addTourist");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// =======================
// 2️⃣ Delete post (Optimistic update)
// =======================
export const deletePost = createAsyncThunk<string, string>(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://southeast-asia-server-three.vercel.app/addTourist/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// =======================
// 3️⃣ Slice
// =======================
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Add a post locally (instant UI)
    addPostLocally: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload); // top of list for instant effect
    },
    // Update a post locally
    updatePostLocally: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) state.posts[index] = action.payload;
      
    },
  },
  extraReducers: (builder) => {
    // ----- Fetch Posts -----
    builder.addCase(fetchPost.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchPost.fulfilled, (state, action: PayloadAction<Post[]>) => {
      state.isLoading = false;
      state.posts = action.payload;
      state.error = null;
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.isLoading = false;
      state.posts = [];
      state.error = (action.payload as string) || "Failed to fetch posts";
    });

    // ----- Delete Posts -----
    builder.addCase(deletePost.pending, (state, action) => {
      state.isLoading = true;
      // Optimistic update: remove post immediately from UI
      state.posts = state.posts.filter((post) => post._id !== action.meta.arg);
    });
    builder.addCase(deletePost.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.isLoading = false;
      // If delete fails, optionally re-fetch or show error
      state.error = (action.payload as string) || "Failed to delete post";
    });
  },
});

export const { addPostLocally, updatePostLocally } = postSlice.actions;
export default postSlice.reducer;
