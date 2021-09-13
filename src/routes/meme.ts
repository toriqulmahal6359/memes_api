import express, { Router } from "express";
import memeController from "../controllers/meme.controller";
import memecontroller from "../controllers/meme.controller";

const router = express.Router();

router.post("/create_image", memeController.createImages);
router.get("/get/images", memecontroller.getAllImages);
router.delete("/delete/:id", memecontroller.deleteImage);

export = router;
