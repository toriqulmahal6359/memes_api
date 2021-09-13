import { Document } from "mongoose";

export default interface IMeme extends Document {
    title: string;
    image: string;
}
