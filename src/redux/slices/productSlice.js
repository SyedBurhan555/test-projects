import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductData } from '../../api/ProductHelperApi';


export const ProductData = createAsyncThunk(
    'product/FetchProductData',
    async () => {
      try {
        const response = await fetchProductData();
        return response.data; // Assuming response is an array of students
      } catch (error) {
        throw Error('Failed to fetch sections data');
      }
    }
  );
  

const initialState = {
    products:[],
    loading:false,
    error:null
}

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(ProductData.pending, (state) => {
        state.loading = true;
      })
      .addCase(ProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        localStorage.setItem('product-data',action.payload)
      })
      .addCase(ProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    }
});

export const {  } = ProductSlice.actions;

export const allProducts = (state) => state.allProducts;

export default ProductSlice.reducer;
