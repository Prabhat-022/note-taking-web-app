import Note from "../model/note.Model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";



export const createNote = async (req, res) => {
    // console.log('image', req.files.image[0])
    // console.log('audio', req.files.audio[0])
    // console.log('createNote:', req.body);

    try {
        const { text, user } = req.body

        // if (!audio || !text || !user) {
        //     return res.status(400).json({
        //         message: "All fields are required",
        //         success: false
        //     })
        // }

        // const audioLocalPath = `./public/temp/recording.wav`
        // const imageLocalPath = `./public/temp/${image}`

        const audioLocalPath = req.files.audio[0].path;
        const imageLocalPath = req.files.image[0].path;

        console.log('imageLocalPath:', imageLocalPath)
        console.log('audioLocalPath:', audioLocalPath)


        if (!audioLocalPath || !imageLocalPath) {
            return res.status(400).json({
                message: "Audio file not found",
                success: false
            })
        }

        const audioUpload = await uploadOnCloudinary(audioLocalPath)
        const imageUpload = await uploadOnCloudinary(imageLocalPath)

        console.log('audioUpload:', audioUpload)
        console.log('imageUpload:', imageUpload)

        if (!audioUpload || !imageUpload) {
            return res.status(400).json({
                message: "Audio and image is't  uploaded on cloudinary",
                success: false
            })
        }


        const note = await Note.create({
            audio: audioUpload?.url,
            text,
            image: imageUpload?.url,
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

    console.log('get all notes req:', req.body)
    try {
        const { user } = req.body;
        const notes = await Note.find({ user })

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

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.body
        const note = await Note.findById(id)
        if (!note) {
            return res.status(400).json({
                message: "Note not found",
                success: false
            })
        }
        const deletedNote = await note.deleteOne();
        return res.status(200).json({
            message: "Note deleted successfully",
            success: true,
            data: deletedNote
        })
    }
    catch (error) {
        console.log(`Error deleting note: ${error}`)
        return res.status(500).json({
            message: "Error deleting note",
            success: false
        })
    }
}