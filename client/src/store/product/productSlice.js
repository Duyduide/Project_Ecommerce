import { createSlice } from "@reduxjs/toolkit";
import { getProduct }  from "./asyncActions";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: null,
        errorMessage: ''
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        });
        builder.addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
  });

//export const { } = appSlice.actions
export default productSlice.reducer
