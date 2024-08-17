"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
} from "react";
import { supabase } from "@/utils/supabase";
import toast from "react-hot-toast";
import { cookies } from "next/headers";
import { getCookie, setCookie } from "@/helpers/cookies";
import { reducer } from "@/helpers/reducer";
import {
  ReducerAction,
  ReducerState,
  initialState,
} from "@/interfaces/reducerInterface";

interface QuestionnaireContextType {
  store: (data: { answer: string; desa: string }) => Promise<any>;
  fetch: () => Promise<any>;
}

// const QuestionnaireContext = createContext<
//   QuestionnaireContextType | undefined
// >(undefined);

// export const useQuestionnaire = () => {
//   const context = useContext(QuestionnaireContext);
//   if (!context) {
//     throw new Error(
//       "useQuestionnaire must be used within a QuestionnaireProvider"
//     );
//   }
//   return context;
// };

async function store(values: any, dispatch: Dispatch<ReducerAction>) {
  let polling = getCookie("polling");

  if (polling === "true") {
    dispatch({ type: "FETCH_FAILURE", error: "Anda sudah mengisi kuesioner" });
    toast.error("Anda sudah mengisi kuesioner");
    return;
  }
  const { data, error } = await supabase
    .from("kosterlanjutatautidak")
    .insert(values)
    .select();

  if (error) {
    dispatch({ type: "FETCH_FAILURE", error: error.message });
    toast.error(error.message);
    throw new Error(error.message);
  }
  setCookie("polling", "true", 365);
  toast.success("Terima Kasih sudah berpartisipasi");
  dispatch({ type: "FETCH_SUCCESS", payload: data });
}

async function fetchPerubahan(dispatch: Dispatch<ReducerAction>) {
  const { data, error } = await supabase
    .from("kosterlanjutatautidak")
    .select("*")
    .eq("answer", "Perubahan")
    .order("created_at", { ascending: false });

  if (error) {
    dispatch({ type: "FETCH_FAILURE", error: error.message });
    toast.error(error.message);
    throw new Error(error.message);
  }
  dispatch({ type: "FETCH_SUCCESS", payload: data });
}

async function fetchNotPerubahan(dispatch: Dispatch<ReducerAction>) {
  const { data, error } = await supabase
    .from("kosterlanjutatautidak")
    .select("*")
    .neq("answer", "Perubahan")
    .order("created_at", { ascending: false });

  if (error) {
    dispatch({ type: "FETCH_FAILURE", error: error.message });
    toast.error(error.message);
    throw new Error(error.message);
  }
  dispatch({ type: "FETCH_SUCCESS", payload: data });
}

async function fetch(dispatch: Dispatch<ReducerAction>) {
  const { data, error } = await supabase
    .from("kosterlanjutatautidak")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    dispatch({ type: "FETCH_FAILURE", error: error.message });
    toast.error(error.message);
    throw new Error(error.message);
  }
  dispatch({ type: "FETCH_SUCCESS", payload: data });
}

export const QuestionnaireContext = createContext<{
  questionnaire: ReducerState;
  dispatch: Dispatch<ReducerAction>;
  fetch: () => Promise<void>;
  fetchPerubahan: () => Promise<void>;
  fetchNotPerubahan: () => Promise<void>;
  store: (values: any) => Promise<void>;
}>({
  questionnaire: initialState,
  dispatch: () => {},
  fetch: () => Promise.resolve(),
  fetchPerubahan: () => Promise.resolve(),
  fetchNotPerubahan: () => Promise.resolve(),
  store: () => Promise.resolve(),
});

const QuestionnaireProvider = ({ children }: { children: ReactNode }) => {
  const [questionnaire, dispatch] = useReducer(reducer, initialState);
  const contextValue = {
    questionnaire,
    dispatch,
    fetch: () => fetch(dispatch),
    fetchPerubahan: () => fetchPerubahan(dispatch),
    fetchNotPerubahan: () => fetchNotPerubahan(dispatch),
    store: (values: any) => store(values, dispatch),
  };
  return (
    <QuestionnaireContext.Provider value={contextValue}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

export default QuestionnaireProvider;
