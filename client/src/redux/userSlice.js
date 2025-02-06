import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: ''
    },
    reducers: {
        setLoginUser: (state, action) => {
            console.log('login action:', action.payload)
            state.user = action.payload;
        },
     
    }
})

export const { setLoginUser } = userSlice.actions;
export default userSlice.reducer;