import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userStats: [],
  isLoading: false,
  error: null,
};

export const getUserStats = createAsyncThunk("user/getUserStats", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/admin/userStats/stats`
  );
  return response.data;
});

const adminUserSlice = createSlice({
  name: "adminUserSlice",
  initialState,
  reducers: {
    resetUserStats: (state) => {
      state.userStats = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userStats = action.payload;
      })
      .addCase(getUserStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.userStats = [];
      });
  },
});

export const { resetUserStats } = adminUserSlice.actions;

export default adminUserSlice.reducer;
