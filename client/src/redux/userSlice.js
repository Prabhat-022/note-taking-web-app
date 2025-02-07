import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: "",
        note: []
    },
    reducers: {
        setLoginUser: (state, action) => {
            state.user = action.payload
        },
        setNote: (state, action) => {
            state.note.push(action.payload)
        }
    }
})

export const { setLoginUser, setNote } = userSlice.actions
export default userSlice.reducer