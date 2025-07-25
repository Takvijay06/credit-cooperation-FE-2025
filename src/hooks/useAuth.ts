import { useSelector } from "react-redux";
import { useMemo } from "react";
import { RootState } from "../store";
import { decodeJwt } from "../utils";
import { ROLE } from "../common/constants";

export const useAuth = () => {
  const { token, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const decodedToken = useMemo(() => {
    if (!token) return null;
    try {
      return decodeJwt(token);
    } catch {
      return null;
    }
  }, [token]);

  const fullName = decodedToken?.fullName ?? null;
  const serialNumber = decodedToken?.serialNumber ?? null;
  const decodedRole = decodedToken?.role ?? null;

  const isAuthenticated = Boolean(token);
  const isAdmin = decodedRole === ROLE.ADMIN;
  const isUser = decodedRole === ROLE.USER;

  return {
    token,
    isLoading,
    error,
    isAuthenticated,
    isAdmin,
    isUser,
    fullName,
    serialNumber,
  };
};
