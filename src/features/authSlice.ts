// src/features/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
// import jwtDecode from "jwt-decode"; // ✅ correct import

// ✅ User interface
export interface User {
  _id: string;
  name: string;
  email: string;
}

// ✅ Auth state interface
interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// ✅ Initial state
const initialState: AuthState = {
  user: null,
  accessToken: Cookies.get("accessToken") || null,
  refreshToken: Cookies.get("refreshToken") || null,
  isLoading: false,
  isAuthenticated: !!Cookies.get("accessToken"),
  error: null,
};

// =======================
// 1️⃣ Register API (no refresh token)
// =======================
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3001/api/v1/user", userData);
      const accessToken = res.data.data.accessToken;

      Cookies.set("accessToken", accessToken, { expires: 7 });

      const decodedUser = jwtDecode<User>(accessToken);
      return { user: decodedUser, accessToken };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

// =======================
// 2️⃣ Login API (with refresh token)
// =======================
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3001/api/v1/auth/login", credentials);
      const accessToken = res.data.data.accessToken;
      const refreshToken = res.data.data.refreshToken;

      Cookies.set("accessToken", accessToken, { expires: 7 });
      Cookies.set("refreshToken", refreshToken, { expires: 30 });

      const decodedUser = jwtDecode<User>(accessToken);
      return { user: decodedUser, accessToken, refreshToken };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// =======================
// 3️⃣ Load Current User
// =======================
export const loadCurrentUser = createAsyncThunk(
  "auth/loadCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      let token = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      if (!token && refreshToken) {
        const res = await axios.post("http://localhost:3001/api/v1/auth/refresh", { token: refreshToken });
        token = res.data.data.accessToken;
        Cookies.set("accessToken", token, { expires: 7 });
      }

      if (!token) return rejectWithValue("No token found");

      const decodedUser = jwtDecode<User>(token);
      return { user: decodedUser };
    } catch {
      return rejectWithValue("Failed to load user");
    }
  }
);

// =======================
// 4️⃣ Logout

// =======================
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  return true;
});

// =======================
// 5️⃣ Auth Slice
// =======================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ----- Register -----
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to register";
    });

    // ----- Login -----
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to login";
    });

    // ----- Load Current User -----
    builder.addCase(loadCurrentUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loadCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(loadCurrentUser.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });

    // ----- Logout -----
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    });
  },
});

export default authSlice.reducer;
