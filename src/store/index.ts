import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import financeSlice from './slices/financeSlice';
import adminSlice from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    finance: financeSlice,
    admin: adminSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;