import Note from "../model/note.Model.js"
import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
    cloud_name: 'dknsgrzbe',
    api_key: '183245858611542',
    api_secret: 'L0homrJ7xgFfOzISZNg7QH_0Jv4' // Click 'View API Keys' above to copy your API secret
});


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
    
        // Upload audio to Cloudinary
        const audioUpload = await cloudinary.uploader.upload(audio, {
            resource_type: "auto"
        });

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(image, {
            resource_type: "auto"
        });

        if (!audioUpload || !imageUpload) {
            return res.status(400).json({
                message: "Failed to upload audio or image on cloudinary",
                success: false
            })
        }

        console.log('audioUpload:', audioUpload)
        console.log('imageUpload:', imageUpload)

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