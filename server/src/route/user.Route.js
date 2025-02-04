import express from "express";
import { Login, logOut, Register } from "../controllers/user.Controllers.js";

const route = express.Router()

route.post("/register", Register)
route.post("/login", Login)
route.post("/logout", logOut)

export default route