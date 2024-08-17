export interface ReducerState {
  data: any;
  loading: boolean;
  error?: string;
}

export interface ReducerAction {
  type: string;
  payload?: any;
  error?: string;
}

export interface ListResponse {
  id: number;
  created_at: string;
  mau_seperti_apa_2024: string;
  kecamatan: string;
  kelurahan: string;
}

export const initialState: ReducerState = {
  data: null,
  loading: false,
  error: undefined,
};
