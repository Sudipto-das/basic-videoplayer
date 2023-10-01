import multer from 'multer'
import ffmpeg from 'fluent-ffmpeg'
import express from 'express'
import { VideoModel } from '../database/db';
import { Request, Response, NextFunction } from 'express';
export const router = express.Router()


//middleware
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});


const upload = multer({storage});

// Endpoint for uploading videos
router.post('/upload', upload.single('video'), async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { filename } = req.file;
        const videopath = req.file.path

        // Save video details to MongoDB
        const video = new VideoModel({
            title,
            description,
            filename,
            videoUrl: videopath,
            segments: [],
        });

        await video.save();

        res.status(201).json({ message: 'Video uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for retrieving video details
router.get('/videos/:videoId', async (req: Request, res: Response,) => {
    try {
        const videoId = req.params.videoId;
        const video = await VideoModel.findById(videoId);

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        res.status(200).send(video)



    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/all', async (req: Request, res: Response) => {
    const videos = await VideoModel.find({})
    res.json({ videos })
})

module.exports = router;

