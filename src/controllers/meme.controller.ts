import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import logging from "../config/logging";
import Meme from "../models/meme";

const NAMESPACE = "Meme Controller";

const createImages = (req: Request, res: Response, next: NextFunction) => {
    let { title, image } = req.body;
    const meme = new Meme({
        _id: new mongoose.Types.ObjectId(),
        title,
        image
    });

    return meme
        .save()
        .then((result) => {
            return res.status(200).json({ meme: result });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getAllImages = (req: Request, res: Response, next: NextFunction) => {
    Meme.find()
        .exec()
        .then((results) => {
            return res.status(200).json({
                image: results,
                count: results.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const deleteImage = (req: Request, res: Response, next: NextFunction) => {
    const meme_delete = Meme.deleteOne({ _id: req.params["id"] }).exec();
    meme_delete
        .then((result) => {
            return res.status(200).json("The image has been deleted");
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.messsage,
                error
            });
        });
};

export default { deleteImage, createImages, getAllImages };
