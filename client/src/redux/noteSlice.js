import { createSlice } from '@reduxjs/toolkit'
const noteSlice = createSlice({
    name: "note",
    initialState: {
        notes: [{
            Audio: "",
            text: "",
            image: "",
            user: ""
        }]
    },
    reducers: {
        addNote: (state, action) => {
            state.notes.push(action.payload)
        }
    }
})

export default noteSlice.reducer;
