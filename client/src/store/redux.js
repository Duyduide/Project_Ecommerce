import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app/appSlice';
import storage from 'redux-persist/lib/storage';
import productListSlice from './product/productListSlice';
import cartSlice from './cart/cartSlice';
import { persistReducer, persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import userSlice from './user/userSlice'

const commonConfig = {
  key: 'shop/user',
  storage
};

const userConfig = {
    ...commonConfig,
    whitelist: ['isLoggedIn', 'token', 'current']
};

export const store = configureStore({
  reducer: {  
    app: appSlice,
    product: productListSlice,
    cart: cartSlice,
    user: persistReducer(userConfig, userSlice)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)
