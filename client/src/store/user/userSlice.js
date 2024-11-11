import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null, // Data of the current user
        token: null // Access token   
      },
    reducers: {
        login: (state, action) => { 
            state.isLoggedIn = action.payload.isLoggedIn
            state.current = action.payload.userData
            state.token = action.payload.token
         }
    },
});

export const { login } = userSlice.actions

export default userSlice.reducer