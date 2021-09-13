import mongoose, { Schema } from "mongoose";
import IMeme from "../interfaces/meme";

const MemeSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        image: { type: String, required: true }
    },
    { timestamps: true }
);

export default mongoose.model<IMeme>("Meme", MemeSchema);
