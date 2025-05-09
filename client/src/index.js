import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {store, persistor} from './store/redux';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Provider store={store}> 
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <App />
          </BrowserRouter>
      </PersistGate> 
    </Provider>
  </GoogleOAuthProvider>
  
);

