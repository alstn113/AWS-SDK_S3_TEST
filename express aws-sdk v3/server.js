require("dotenv").config();
const express = require("express");
const AWS3 = require("@aws-sdk/client-s3");
const { s3Client } = require("./libs/s3Client");
const multer = require("multer");

const app = express();
const upload = multer({});
const S3_BUCKET = process.env.S3_BUCKET;

// 버킷 리스트 보여줌
app.get("/v3/buckets", async (_req, res) => {
  try {
    const command = new AWS3.ListBucketsCommand({});
    const response = await s3Client.s3Instance.send(command);
    res.send(response.Buckets);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// 단일 파일 업로드
app.post("/v3/post", upload.single("file"), async (req, res) => {
  try {
    const fileName = `${Date.now()}-${req.file.originalname}`;
    let uploadParams = {
      Key: fileName,
      Bucket: S3_BUCKET,
      Body: req.file.buffer,
    };
    const command = new AWS3.PutObjectAclCommand(uploadParams);
    const response = await s3Client.s3Instance.send(command);
    if (response.$metadata.httpStatusCode === 200) {
      res.send("success");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});
