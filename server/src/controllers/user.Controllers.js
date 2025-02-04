import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../model/user.Model.js"

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })

        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            })
        }

        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })


        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 1000,
            httpOnly: true,
            sameSite: 'strict'
        })
            .json({
                message: `Login successful`,
                success: true,
                token,
                user // Include the full user details in response 
            });
            
    } catch (error) {
        console.log(`Invalid login: ${error}`)
        return res.status(500).json({
            message: "Login failed",
            success: false
        })
    }
}
export const Register = async (req, res) => {

    try {
        const { fullName, userName, email, password } = req.body;

        if (!fullName || !userName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            })
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const user = await User.create({
            fullName,
            userName,
            email,
            password: hashedPassword
        })

        res.status(200).json({
            message: "User created successfully",
            success: true,
            data: user
        })

    } catch (error) {
        console.log(`Account not created: ${error}`)
        return res.status(401).json({
            message: "Account not created",
            success: false,
        })
    }

}

export const logOut = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logout successfully",
            success: true
        })
    } catch (error) {
        console.log(`Logout failed: ${error}`)
    }
}  