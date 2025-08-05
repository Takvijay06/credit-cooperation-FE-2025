import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  FinanceState,
  FinancialYear,
  FinancialEntry,
  FinancialInsertEntry,
  UserFinancialParams,
} from "../../types";
import { financeService } from "../../services/financeService";

const initialState: FinanceState = {
  financialYears: [],
  financialEntries: [],
  usersLoan: [],
  selectedYear: null,
  selectedMonth: null,
  isLoading: false,
  error: null,
};

interface YearMonth {
  year: string;
  month: string;
}

export const fetchFinancialYears = createAsyncThunk(
  "finance/fetchFinancialYears",
  async (_, { rejectWithValue }) => {
    try {
      const response = await financeService.getFinancialYears();
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || "Failed to fetch financial years");
    }
  }
);

export const fetchFinancialEntries = createAsyncThunk(
  "finance/fetchFinancialEntries",
  async (yearMonth: YearMonth, { rejectWithValue }) => {
    try {
      const response = await financeService.getFinancialEntries(yearMonth);
      return response.data.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || "Failed to fetch financial entries");
    }
  }
);

export const fetchUserFinancialData = createAsyncThunk(
  "finance/fetchUserFinancialData",
  async (params: UserFinancialParams, { rejectWithValue }) => {
    try {
      const response = await financeService.getUserFinancialData(params);
      return response.data.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || "Failed to fetch user financial data");
    }
  }
);

export const insertFinancialEntry = createAsyncThunk(
  "financial/insertEntry",
  async (entryData: FinancialInsertEntry, { rejectWithValue }) => {
    try {
      // TODO: remove this console.log in production
      console.log("entryData", entryData);
      const response = await financeService.insertEntry(entryData);
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || "Insert failed");
    }
  }
);

export const fetchLoanUsers = createAsyncThunk(
  "admin/fetchLoanUsers",
  async (params: YearMonth, { rejectWithValue }) => {
    try {
      const response = await financeService.getLoanUsers(params);
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return rejectWithValue(err.response?.data?.message || "Failed to fetch users");
    }
  }
);

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setSelectedYear: (state, action: PayloadAction<string | null>) => {
      state.selectedYear = action.payload;
    },
    setSelectedMonth: (state, action: PayloadAction<string | null>) => {
      state.selectedMonth = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetFinanceState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Financial Years
      .addCase(fetchFinancialYears.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFinancialYears.fulfilled, (state, action: PayloadAction<FinancialYear[]>) => {
        state.isLoading = false;
        state.financialYears = action.payload;
      })
      .addCase(fetchFinancialYears.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Financial Entries
      .addCase(fetchFinancialEntries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFinancialEntries.fulfilled, (state, action: PayloadAction<FinancialEntry[]>) => {
        state.isLoading = false;
        state.financialEntries = action.payload;
      })
      .addCase(fetchFinancialEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // User Financial Data
      .addCase(fetchUserFinancialData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserFinancialData.fulfilled, (state, action: PayloadAction<FinancialEntry[]>) => {
        state.isLoading = false;
        state.financialEntries = action.payload;
      })
      .addCase(fetchUserFinancialData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Loan Users
      .addCase(fetchLoanUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLoanUsers.fulfilled, (state, action: PayloadAction<{ data: any[] }>) => {
        state.isLoading = false;
        state.usersLoan = action.payload.data;
      })
      .addCase(fetchLoanUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSelectedYear,
  setSelectedMonth,
  clearError,
  resetFinanceState,
} = financeSlice.actions;

export default financeSlice.reducer;
