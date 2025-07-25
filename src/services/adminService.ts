import { api } from "./api";
import { User, APIResponse, PaginationParams, UserRequest } from "../types";

const APIRoutes = {
  pendingUserApproval: "/admin/pending-approvals",
  getUserDetails: "/admin/users",
  approveUserRequest: "/admin/approve",
};

export const adminService = {
  getPendingUsers: () =>
    api.get<APIResponse<UserRequest[]>>(APIRoutes.pendingUserApproval),

  getUsers: (params: PaginationParams) =>
    api.get<APIResponse<{ users: UserRequest[]; total: number }>>(
      APIRoutes.getUserDetails,
      { params }
    ),

  approveUser: (userId: string) =>
    api.put<APIResponse<User>>(`${APIRoutes.approveUserRequest}/${userId}`),
};
