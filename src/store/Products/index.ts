import { BASE_URL } from "@/utils/apiurl";
import { Dispatch, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface Redux {
    getState: any;
    dispatch: Dispatch<any>;
    rejectWithValue: (value: any) => void;
  }
export const getAllProduct = createAsyncThunk(
  "product",
  async (limit: number, { rejectWithValue }) => {
    const response = await fetch(`${BASE_URL}products?limit=${limit}`);
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue("Error");
    }
  }
);
// getting the single product data also
export const getProduct = createAsyncThunk('product-single/fetch', async(id:number) => {
    const response = await fetch(`${BASE_URL}products/${id}`);
    const data = await response.json();
    return data;
});
export const updateUi = createAsyncThunk(
    "user/ui",
    async (data: any, {}: Redux) => {
      return data;
    }
  );
export const ProductSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,

    totalquantity: 0,
    totalprice: 0,
    data:[],
    ui: {
       
        opencart: {
          open: false,
        },
      }
  },
  reducers: {},
  extraReducers: (builder) => {
   builder
      .addCase(getAllProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as any;
      })
      .addCase(getProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.data;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as any;
      })
      .addCase(updateUi.fulfilled, (state, action )=> {
        state.ui = { ...state.ui, ...action.payload };
      })
  }
});

export default ProductSlice.reducer;