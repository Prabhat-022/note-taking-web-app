import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    audio: {
        type: String,
    },
    text: {
        type: String,
    },
    image: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true
})

const Note = mongoose.model("Note", noteSchema)
export default Note