import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { userName: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { userName, accessToken } = action.payload
            state.userName  = userName
            state.token     = accessToken
        },
        logOut: (state, token) => {
            state.userName  = null
            state.token     = null
        }
    }
})

export default authSlice.reducer
export const { setCredentials, logOut } = authSlice.actions
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUser  = (state) => state.auth.userName
