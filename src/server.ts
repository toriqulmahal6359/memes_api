import http from "http";
import express from "express";
import bodyParser from "body-parser";
import logging from "./config/logging";
import config from "./config/config";
import memeRoutes from "./routes/meme";
import mongoose from "mongoose";

const NAMESPACE = "Server";
const router = express();

/** Connect Database */
mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, "Connection Established Successfully");
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });

/** Logging request */
router.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]]`);

    res.on("finish", () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]], STATUS - [${res.statusCode}]`);
    });

    next();
});

/** Parse JSON for request */
router.use(express.urlencoded({ extended: false })); //bodyParser
router.use(express.json());

/** Rules */
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH POST PUT DELETE");
        return res.status(200).json({});
    }

    next();
});

/** Routes */
router.use("/api/memes", memeRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error("Not Found");
    return res.status(404).json({
        message: error.message
    });
});

/** Listening Server */
const httpServer = http.createServer(router);
router.listen(config.server.port, () => {
    logging.info(NAMESPACE, `Server is running on ${config.server.hostname}:${config.server.port}`);
});
