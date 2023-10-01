"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const db_1 = require("../database/db");
exports.router = express_1.default.Router();
//middleware
const storage = multer_1.default.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// Endpoint for uploading videos
exports.router.post('/upload', upload.single('video'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const { filename } = req.file;
        const videopath = req.file.path;
        // Save video details to MongoDB
        const video = new db_1.VideoModel({
            title,
            description,
            filename,
            videoUrl: videopath,
            segments: [],
        });
        yield video.save();
        res.status(201).json({ message: 'Video uploaded successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Endpoint for retrieving video details
exports.router.get('/videos/:videoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videoId = req.params.videoId;
        const video = yield db_1.VideoModel.findById(videoId);
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.status(200).send(video);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const videos = yield db_1.VideoModel.find({});
    res.json({ videos });
}));
module.exports = exports.router;
