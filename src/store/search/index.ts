import { BASE_URL } from "@/utils/apiurl";
import { Dispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface Redux {
    getState: any;
    dispatch: Dispatch<any>;
    rejectWithValue: (value: any) => void;
  }
export const getSearch = createAsyncThunk(
    "product",
    async (searchterm: any, { rejectWithValue }) => {
      const response = await fetch(`${BASE_URL}products/search?q=${searchterm}`);
      try {
        const result = await response.json();
        return result;
      } catch (error) {
        return rejectWithValue("Error");
      }
    }
  );

  export const SearchSlice:any=createSlice({
      name: 'search',
      initialState: {searchProducts: <any[]>[],loading:false,    error: null,},
      reducers: {   clearSearch: (state) => {
        state.searchProducts = [];
    }},
   
    extraReducers: (builder) => {
      builder
        .addCase(getSearch.pending, (state, action) => {
          state.loading= true;
        })
        .addCase(getSearch.fulfilled, (state, action) => {
            state.loading = false;
            state.searchProducts = action.payload;
          })
          .addCase(getSearch.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message as any;
          })
    }
  })
  export default SearchSlice.reducer
  export const { clearSearch } = SearchSlice.actions;
export const getSearchProducts = (state:any) => state.search.searchProducts;
export const getSearchProductsStatus = (state:any) => state.search.searchProductsStatus;