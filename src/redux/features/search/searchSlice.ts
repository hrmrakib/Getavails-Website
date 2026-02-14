import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  results: any[];
  meta: any | null;
  message: string | null;
}

const initialState: SearchState = {
  results: [],
  meta: null,
  message: null,
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
  },
});

export const { setSearchResult, clearSearchResult } = searchSlice.actions;
export default searchSlice.reducer;
