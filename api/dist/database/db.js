"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const VideoSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    filename: String,
    videoUrl: String,
    segments: [
        {
            topics: String,
            start: Number,
            end: Number
        }
    ]
});
exports.VideoModel = mongoose_1.default.model('Video', VideoSchema);
module.exports = { VideoModel: exports.VideoModel };
