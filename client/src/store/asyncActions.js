import { createAsyncThunk } from '@reduxjs/toolkit';
import * as apis from '../apis';

export const getCategories = createAsyncThunk('app/getCategories', async(data, { rejectedWithValue }) => {
    const response = await apis.apiGetCategories();
    //console.log(response.data);
    if(!response.data.success) return rejectedWithValue(response.data);
    return response.data.prodCategories;
})