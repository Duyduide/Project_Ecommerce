import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getProduct = createAsyncThunk('product/getProduct', async(data, { rejectedWithValue }) => {
    const response = await apis.apiGetProduct();
    if(!response.success) return rejectedWithValue(response);
    return response.products;
})
