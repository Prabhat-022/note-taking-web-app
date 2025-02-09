import express from 'express';
import dotenv from 'dotenv';
import DBConnection from './src/db/db.Connection.js';
import userRoute from './src/route/user.Route.js';
import noteRoute from './src/route/note.Route.js';
import cors from 'cors';

dotenv.config()
const app = express()
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(
    {
        origin: 'http://localhost:5173',

    }
))


app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use("/api/v1/user", userRoute);
app.use("/api/v1/note", noteRoute);

app.listen(port, () => {
    DBConnection()
    console.log('Server running on port ' + port)
})