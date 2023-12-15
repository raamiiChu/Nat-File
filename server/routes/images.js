import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";

import { uploadFile, deleteFile } from "../AWS/s3Server.js";

const route = Router();

const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 10000000 },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
            return cb(new Error("Please upload an image"));
        }

        cb(null, true);
    },
});

route.post("/upload", upload.single("image"), async (req, res) => {
    const currTime = Date.now();
    const uuid = uuidv4();

    try {
        const s3Key = await uploadFile(req.file, uuid, currTime, "main");
        return res.status(200).send(s3Key);
    } catch (err) {
        console.error(`Error uploading file: ${err}`);
        res.status(500).send("Error uploading file to S3");
    }
});

route.get("/:key", async (req, res) => {
    const { key } = req.params;

    try {
        const readStream = downloadFile(key);

        readStream.on("error", (err) => {
            console.error(`Error reading file stream: ${err}`);
            res.status(500).send("Error reading file");
        });

        readStream.pipe(res);
    } catch (err) {
        console.error(`Error handling download: ${err}`);
        res.status(500).send("Error downloading file");
    }
});

route.delete("/:key", async (req, res) => {
    const { key } = req.params;

    try {
        await deleteFile(key);
        return res.status(200).send("File deleted from S3");
    } catch (err) {
        console.error(`Error deleting file: ${err}`);
        res.status(500).send("Error deleting file from S3");
    }
});

export default route;
