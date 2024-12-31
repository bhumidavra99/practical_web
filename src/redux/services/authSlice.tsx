import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiInstance } from "./axiosApi";

const getDefaultUser = () => {
  if (typeof window !== "undefined") {
    let user = localStorage.getItem("user");
    if (user && user !== "undefined") {
      return JSON.parse(user);
    }
  }
  return null;
};

const initialState = {
  user: typeof window !== "undefined" && localStorage.getItem("user") ? getDefaultUser() : {},
  loginLoading: false,
  verifyLoading: false,
};

export const login = createAsyncThunk("auth/login", async (payload) => {
  return await apiInstance.post("/auth/login", payload);
});

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logOut: (state: any) => {
      state.user = {};
      state.loginLoading = false;
      if (typeof window !== "undefined") {
        localStorage.clear();
      }
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(login.pending, (state: any) => {
      state.loginLoading = true;
    });
    builder.addCase(login.fulfilled, (state: any, action: any) => {
      state.user = action.payload.data;
      state.loginLoading = false;
    });
    builder.addCase(login.rejected, (state: any) => {
      state.loginLoading = false;
    });
  },
});

export default authSlice.reducer;
export const { logOut } = authSlice.actions;

export const selectUser = (state: any) => state.auth.user;

export const useUser = () => {
  const user: any = useSelector(selectUser);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
  }, []);

  useEffect(() => {
    if (isClient) {
      if (user !== undefined && user !== null) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    }
  }, [user, isClient]);

  return useMemo(() => ({ user }), [user]);
};
