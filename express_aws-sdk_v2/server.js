require("dotenv").config();
const express = require("express");
const { AWS } = require("./libs/AWS");
const multer = require("multer");

const app = express();
const s3 = new AWS.S3({});
const upload = multer({});
const Bucket = process.env.S3_BUCKET;
// 버킷 리스트 보여줌
app.get("/buckets", (_req, res) => {
  try {
    s3.listBuckets((err, data) => {
      if (err) {
        console.log(err);
      }
      res.send(data.Buckets);
    });
  } catch (err) {
    console.log(err);
  }
});

// 단일 파일 업로드
app.post("/image", upload.single("file"), (req, res) => {
  try {
    const fileName = `${Date.now()}-${req.file.originalname}`;
    let uploadParams = {
      Key: fileName,
      Bucket,
      Body: req.file.buffer,
    };
    s3.upload(uploadParams, (err, data) => {
      if (err) console.log(err);
      res.send(data);
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});
