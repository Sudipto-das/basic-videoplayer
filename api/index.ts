import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const videoRouter = require('./routes/video')
const app = express()
app.use(cors());
app.use(express.json());
app.use('/video',videoRouter)



app.listen(3001, () => {
    console.log('server running at port 3001')
})
mongoose.connect(
    "mongodb+srv://S_das:Sudipto123@cluster0.c1sttyl.mongodb.net/",
    { dbName: "VideoPlayer" }
  );


