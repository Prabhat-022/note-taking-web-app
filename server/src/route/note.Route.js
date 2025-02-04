import express from "express";
import { createNote, getAllNotes } from "../controllers/note.Controllers.js";

const route = express.Router()

route.post("/create", createNote)
route.post("/get-all", getAllNotes)

export default route