import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../../apis';

export const getProductList = createAsyncThunk('product/getProductList', async (category, page, sortField, sortOrder, pageSize) => {
    const response = await apis.apiGetProduct(category, page, sortField, sortOrder, pageSize);
    return response;
})