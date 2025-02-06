import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: ''
    },
    reducers: {
        login: (state, action) => {
            console.log('login action:', action.payload)
            state.user = action.payload;
        },
     
    }
})

export const { login } = userSlice.actions;
export default userSlice.reducer;