import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./userSlice"
import noteSlice from "./noteSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        note: noteSlice
    }
})
