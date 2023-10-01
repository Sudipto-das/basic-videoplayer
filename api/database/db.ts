import mongoose from 'mongoose'


export interface Video {
    title: string;
    description: string;
    filename: string;
    videoUrl:String;
    segments: [
        {
            topics: String;
            start: Number;
            end: Number;
        }

    ]
}
const VideoSchema = new mongoose.Schema<Video>({
    title: String,
    description: String,
    filename: String,
    videoUrl:String,
    segments: [
        {
            topics: String,
            start: Number,
            end: Number
        }
    ]

})

export const VideoModel = mongoose.model<Video>('Video', VideoSchema);

module.exports = { VideoModel }
