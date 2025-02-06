import express from "express";
import { createNote, getAllNotes } from "../controllers/note.Controllers.js";
import { upload } from '../middleware/multer.js';
const router = express.Router()

router.route("/create").post(
    upload.fields([
        {
            name: "image",
            maxCount: 1
        },
        {
            name: "audio",
            maxCount: 1
        }
    ]),
    createNote);
// route.post("/create", createNote)
router.route("/get-all-notes").post(getAllNotes)

export default router