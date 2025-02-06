import userSlice from "./userSlice"
import noteSlice from "./noteSlice"
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        user: userSlice,
        note: noteSlice
    }
})
