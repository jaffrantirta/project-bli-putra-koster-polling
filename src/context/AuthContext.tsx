"use client";

import { createContext, ReactNode, useReducer, Dispatch } from "react";
import { supabase } from "@/utils/supabase";
import toast from "react-hot-toast";
import { reducer } from "@/helpers/reducer";
import {
  ReducerAction,
  ReducerState,
  initialState,
} from "@/interfaces/reducerInterface";

interface AuthContext {
  login: (data: { mau_seperti_apa_2024: string; desa: string }) => Promise<any>;
}

async function login(
  email: any,
  password: any,
  dispatch: Dispatch<ReducerAction>
) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    dispatch({ type: "FETCH_FAILURE", error: error.message });
    toast.error(error.message);
    throw new Error(error.message);
  }
  localStorage.setItem("access_token", data.session.access_token);
  localStorage.setItem("refresh_token", data.session.refresh_token);
  localStorage.setItem("token_type", data.session.token_type);
  const expiresAt = data?.session?.expires_at;
  localStorage.setItem("expires_at", expiresAt?.toString() || "");
  localStorage.setItem("user", JSON.stringify(data.user));

  // Redirect to dashboard
  window.location.href = "/admin/dashboard";
}

export const AuthContext = createContext<{
  auth: ReducerState;
  dispatch: Dispatch<ReducerAction>;
  login: (email: any, password: any) => Promise<any>;
}>({
  auth: initialState,
  dispatch: () => {},
  login: () => Promise.resolve(),
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, dispatch] = useReducer(reducer, initialState);
  const contextValue = {
    auth,
    dispatch,
    login: (email: any, password: any) => login(email, password, dispatch),
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
