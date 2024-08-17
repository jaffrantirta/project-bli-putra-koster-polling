import { ReducerAction, ReducerState } from "@/interfaces/reducerInterface";

export function reducer(
  state: ReducerState,
  action: ReducerAction
): ReducerState {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: undefined,
      };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

export const getErrors = (state: ReducerState, fieldName: string) => {
  const error = state.error;
  if (!error) return undefined;
  try {
    const errors = JSON.parse(error).errors;
    if (!errors) return undefined;
    const fieldError = errors[fieldName];
    return fieldError;
  } catch (err) {
    return undefined;
  }
};

export const getErrorMessage = (state: ReducerState) => {
  const error = state.error;
  if (!error) return undefined;
  try {
    const parsedError = JSON.parse(error);
    const message = parsedError.message;
    if (!message) return undefined;
    return message;
  } catch (err) {
    return undefined;
  }
};
