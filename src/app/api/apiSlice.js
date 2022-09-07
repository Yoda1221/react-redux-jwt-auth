import { createApi, fetchBaseQuery }    from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut }       from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5040',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) headers.set("authorization", `Bearer ${token}`)
        return headers
    }
})

const baseQueryWithReauth = async (args, api, options) => {
    let result = await baseQuery(args, api, options)

    if (result?.error?.originalStatus ===  403) {
        console.log('SENDING REFRESH TOKEN')
        //* SEND REFRESHTOKEN TO NEW ACCESTOKEN
        const refreshResult = await baseQuery('/refresh', api, options)
        console.log("🚀 ~ file: apiSlice.js ~ line 22 ~ baseQueryWithReauth ~ refreshResult", refreshResult)
        if (refreshResult?.data) {
            const userName = api.getState().auth.userName
            //* STORE THE NEW TOKEN
            api.dispatch(setCredentials({...refreshResult.data, userName }))
            //* RETRY THE ORIGINAL QUERY WITH NEW ACCESTOKEN
            result = await baseQuery(args, api, options)
        } else api.dispatch(logOut())
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
