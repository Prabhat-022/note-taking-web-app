import Note from "../model/note.Model.js"

export const createNote = async (req, res) => {
    console.log(req.body)
    try {
        const { audio, text, image, user } = req.body

        if (!audio || !text || !user) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        const note = await Note.create({
            audio,
            text,
            image,
            user
        })

        return res.status(200).json({
            message: "Note created successfully",
            success: true,
            data: note
        })
    } catch (error) {
        console.log(`Error creating note: ${error}`)
        return res.status(500).json({
            message: "Error creating note",
            success: false
        })
    }
}

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id })
        return res.status(200).json({
            message: "Notes fetched successfully",
            success: true,
            data: notes
        })
    } catch (error) {
        console.log(`Error fetching notes: ${error}`)
        return res.status(500).json({
            message: "Error fetching notes",
            success: false
        })
    }
}