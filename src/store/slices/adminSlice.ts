/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminState, PaginationParams } from "../../types";
import { adminService } from "../../services/adminService";

const initialState: AdminState = {
  users: [],
  pendingUsers: [],
  totalUsers: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
};

export const fetchPendingUsers = createAsyncThunk(
  "admin/fetchPendingUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getPendingUsers();
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch pending users"
      );
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (params: PaginationParams, { rejectWithValue }) => {
    try {
      const response = await adminService.getUsers(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

export const approveUser = createAsyncThunk(
  "admin/approveUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await adminService.approveUser(userId);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to approve user"
      );
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPendingUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingUsers = action.payload;
      })
      .addCase(fetchPendingUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.users = action.payload;
        // state.totalUsers = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(approveUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(approveUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingUsers = action.payload;
      })
      .addCase(approveUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentPage, clearError } = adminSlice.actions;
export default adminSlice.reducer;
