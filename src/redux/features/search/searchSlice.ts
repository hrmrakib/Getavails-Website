import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  page: number;
  limit: number;
  resultType: string;
  results: any[];
  meta: any | null;
  message: string | null;
  searchLoading: boolean;
}

const initialState: SearchState = {
  page: 1,
  limit: 25,
  resultType: "",
  results: [],
  meta: null,
  message: null,
  searchLoading: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResult: (state, action: PayloadAction<any>) => {
      state.results = action.payload.data || [];
      state.meta = action.payload.meta || null;
      state.message = action.payload.message || null;
    },

    clearSearchResult: (state) => {
      state.results = [];
      state.meta = null;
      state.message = null;
    },

    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.searchLoading = action.payload;
    },

    setResultType: (state, action: PayloadAction<string>) => {
      state.resultType = action.payload;
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
});

export const {
  setSearchResult,
  clearSearchResult,
  setSearchLoading,
  setResultType,
  setPage,
  setLimit,
} = searchSlice.actions;
export default searchSlice.reducer;
