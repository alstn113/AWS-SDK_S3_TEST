require("dotenv").config();
const express = require("express");

const AWS3 = require("@aws-sdk/client-s3");
const multer = require("multer");

const app = express();

const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_KEY;
const region = process.env.S3_REGION;
const bucket = process.env.S3_BUCKET;

const s3Client = new AWS3.S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

const upload = multer({});

// 버킷 리스트 보여줌
app.get("/image/buckets", async (_req, res) => {
  try {
    const command = new AWS3.ListBucketsCommand({});
    const response = await s3Client.send(command);
    res.send({ buckets: response.Buckets });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// 단일 파일 업로드
app.post("/image/upload", upload.single("file"), async (req, res) => {
  try {
    const fileName = `${Date.now()}-${req.file.originalname}`;
    let uploadParams = {
      Key: fileName,
      Bucket: bucket,
      Body: req.file.buffer,
    };
    const command = new AWS3.PutObjectCommand(uploadParams);
    const response = await s3Client.send(command);
    if (response.$metadata.httpStatusCode === 200) {
      res.send(
        "Successfully uploaded object: " +
          uploadParams.Bucket +
          "/" +
          uploadParams.Key
      );
    }
  } catch (err) {
    console.log(err);
  }
});

// 단일 파일 삭제
app.delete("/image/:fileName", async (req, res) => {
  try {
    const command = new AWS3.DeleteObjectCommand({
      Bucket: bucket,
      Key: req.params.fileName,
    });
    await s3Client.send(command);
    res.send("Success");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});
