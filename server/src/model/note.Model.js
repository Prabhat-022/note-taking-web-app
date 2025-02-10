import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    audio: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },  
}, {
    timestamps: true
})

const Note = mongoose.model("Note", noteSchema)
export default Note