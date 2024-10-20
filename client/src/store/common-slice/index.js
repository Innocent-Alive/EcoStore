import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/common/feature/get`
    );

    return response.data;
  }
);

// Define the delete action (this is just an example)
export const deleteFeatureImage = createAsyncThunk(
  "common/deleteFeatureImage",
  async (imageId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/common/feature/delete/${imageId}`,
        { method: "DELETE" }
      );

      // Check if the response is not okay, handle errors
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData); // Send back error details to be caught
      }

      // Return the successful response JSON
      return await response.json();
    } catch (error) {
      console.error("Error deleting feature image:", error);
      return rejectWithValue(error.message); // Pass error to reducer for handling
    }
  }
);

export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/common/feature/add`,
      { image }
    );

    return response.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.featureImageList = state.featureImageList.filter(
          (img) => img._id !== action.meta.arg // Use _id if MongoDB
        );
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;
