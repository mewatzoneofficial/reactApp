// src/features/users/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../utils/config";

// ✅ Async thunk to fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page = 1, limit = 10, name = "", email = "" }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({ page, limit });
      if (name) queryParams.append("name", name);
      if (email) queryParams.append("email", email);

      const res = await fetch(`${API_URL}users?${queryParams.toString()}`);
      const data = await res.json();

      return {
        results: data.data.results || [],
        page: data.data.page || 1,
        totalPages: data.data.totalPages || 1,
        total: data.data.total || 0,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// ✅ Async thunk to delete user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    page: 1,
    limit: 10,
    totalPages: 1,
    totalEntries: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.results;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalEntries = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.users = [];
      })
      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user.faculityID !== action.payload
        );
      });
  },
});

export default usersSlice.reducer;
