import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";

const BucketName = process.env.BUCKET_NAME;

const s3 = new S3({
    region: process.env.BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

// upload a file to s3
export async function uploadFile(file, uuid, currTime, name) {
    const fileStream = fs.createReadStream(file.path);

    const params = {
        Bucket: BucketName,
        Body: fileStream,
        Key: `${uuid}-${currTime}-${name}`,
        ContentType: "image/jpeg",
    };

    try {
        const result = await s3.upload(params).promise();

        fs.unlink(file.path, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
                throw err;
            }
            console.log("File deleted successfully.");
        });

        return result.Key;
    } catch (err) {
        console.error("Error uploading file:", err);
        throw err;
    }
}

// delete a file from S3
export async function deleteFile(fileKey) {
    const params = {
        Key: fileKey,
        Bucket: BucketName,
    };

    try {
        const result = await s3.deleteObject(params).promise();
        console.log(`File deleted: ${fileKey}`);
        return result;
    } catch (err) {
        console.error(`Error deleting file: ${fileKey}`, err);
        throw err;
    }
}

export default { uploadFile, downloadFile, deleteFile };
