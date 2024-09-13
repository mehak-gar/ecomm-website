import { BASE_URL } from "@/utils/apiurl";
import { Dispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface Redux {
    getState: any;
    dispatch: Dispatch<any>;
    rejectWithValue: (value: any) => void;
  }
export const getAllCategory = createAsyncThunk(
  "category",
  async (limit: any, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}products/category-list`);
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);
// getting the single product data also
export const getCategory = createAsyncThunk('category-single/fetch', async(category:string) => {
    const response = await fetch(`${BASE_URL}products/category/${category}`);
    const data = await response.json();
    return data;
});
export const updateCategoryUi = createAsyncThunk(
    "category/uis",
    async (data: any, {}: Redux) => {
      return data;
    }
  );
export const categorySlice= createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
    products:[],

    uis: {
       
        opencategory: {
          open: false,
        }
      }
  },
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as any;
      })
      .addCase(getCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.data;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as any;
      })
      .addCase(updateCategoryUi.fulfilled, (state, action )=> {
        state.uis = { ...state.uis, ...action.payload };
      })
  }
});

export default categorySlice.reducer;