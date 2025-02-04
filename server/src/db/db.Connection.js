import mongoose from "mongoose";

const DBConnection = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log(`MongoDB connected to server ${mongoose.connection.host}`)
        })
    } catch (error) {
        console.log(`MongoDB connection failed: ${error}`)
    }
}

export default DBConnection;