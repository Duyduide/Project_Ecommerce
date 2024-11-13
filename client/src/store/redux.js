import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import storage from 'redux-persist/lib/storage';
import productListSlice from './product/productListSlice'

import { persistReducer, persistStore } from 'redux-persist';
import userSlice from './user/userSlice'

const commonConfig = {
  key: 'shop/user',
  storage
};

const userConfig = {
    ...commonConfig,
    whitelist: ['isLoggedIn', 'token']
};

export const store = configureStore({
  reducer: {
    app: appSlice,
    user: persistReducer(userConfig, userSlice),
    product: productListSlice
  },
});

export const persistor = persistStore(store)
