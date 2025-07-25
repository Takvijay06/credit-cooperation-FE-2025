import { api } from "./api";
import {
  FinancialYear,
  FinancialEntry,
  APIResponse,
  PaginationParams,
  FinancialInsertEntry,
  UserFinancialData,
  UserFinancialParams,
} from "../types";

interface YearMonth {
  year: string;
  month: string;
}

export const financeService = {
  getFinancialYears: () =>
    api.get<APIResponse<FinancialYear[]>>("/admin/financial-entry"),

  getFinancialEntries: (params: YearMonth) =>
    api.get<APIResponse<FinancialEntry[]>>("/admin/financial-entry", {
      params,
    }),

  getUserFinancialData: (params: UserFinancialParams) =>
    api.get<APIResponse<UserFinancialData>>("/user/financial-entry", {
      params,
    }),

  getMonthFinancialData: (userId: string, year: number, month: number) =>
    api.get<APIResponse<FinancialEntry>>(
      `/finance/user/${userId}/year/${year}/month/${month}`
    ),

  insertEntry: (insertEntrydata: FinancialInsertEntry) =>
    api.post<APIResponse<{ message: string }>>(
      "/admin/financial-entry",
      insertEntrydata
    ),
};
