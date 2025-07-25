/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  FinanceState,
  FinancialYear,
  FinancialEntry,
  PaginationParams,
  FinancialInsertEntry,
  UserFinancialParams,
} from "../../types";
import { financeService } from "../../services/financeService";

const initialState: FinanceState = {
  financialYears: [],
  financialEntries: [],
  selectedYear: null,
  selectedMonth: null,
  isLoading: false,
  error: null,
};

export const fetchFinancialYears = createAsyncThunk(
  "finance/fetchFinancialYears",
  async (_, { rejectWithValue }) => {
    try {
      const response = await financeService.getFinancialYears();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch financial years"
      );
    }
  }
);

interface YearMonth {
  year: string;
  month: string;
}

export const fetchFinancialEntries = createAsyncThunk(
  "finance/fetchFinancialEntries",
  async (yearMonth: YearMonth, { rejectWithValue }) => {
    try {
      const response = await financeService.getFinancialEntries(yearMonth);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch financial entries"
      );
    }
  }
);

export const fetchUserFinancialData = createAsyncThunk(
  "finance/fetchUserFinancialData",
  async (
    serialNumberAndYear: UserFinancialParams,
    { rejectWithValue }
  ) => {
    try {
      const response = await financeService.getUserFinancialData(serialNumberAndYear);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user financial data"
      );
    }
  }
);

export const insertFinancialEntry = createAsyncThunk(
  "financial/insertEntry",
  async (entryData: FinancialInsertEntry, { rejectWithValue }) => {
    try {
      console.log("entryData", entryData);
      const response = await financeService.insertEntry(entryData);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Insert failed");
    }
  }
);

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetFinanceState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinancialYears.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFinancialYears.fulfilled, (state, action) => {
        state.isLoading = false;
        state.financialYears = action.payload;
      })
      .addCase(fetchFinancialYears.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFinancialEntries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFinancialEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.financialEntries = action.payload;
      })
      .addCase(fetchFinancialEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchUserFinancialData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserFinancialData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.financialEntries = action.payload;
      })
      .addCase(fetchUserFinancialData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedYear, setSelectedMonth, clearError, resetFinanceState } =
  financeSlice.actions;
export default financeSlice.reducer;
