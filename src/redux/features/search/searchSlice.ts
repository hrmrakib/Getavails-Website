import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  results: any[];
  meta: any | null;
  message: string | null;
  searchLoading: boolean;
}

const initialState: SearchState = {
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
  },
});

export const { setSearchResult, clearSearchResult, setSearchLoading } =
  searchSlice.actions;
export default searchSlice.reducer;
