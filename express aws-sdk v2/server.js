require("dotenv").config();
const express = require("express");
const AWSClient = require("./AWSClient");
const multer = require("multer");

const app = express();
const s3 = new AWSClient.AWS.S3({});
const upload = multer({});
const S3_BUCKET = process.env.S3_BUCKET;

// 버킷 리스트 보여줌
app.get("/v2/buckets", (_req, res) => {
  s3.listBuckets((err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(data.Buckets);
  });
});

// 단일 파일 업로드
app.post("/v2/post", upload.single("file"), (req, res) => {
  try {
    const fileName = `${Date.now()}-${req.file.originalname}`;
    let uploadParams = { Key: fileName, Bucket: S3_BUCKET, Body: req.file.buffer };
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.log(err);
      }
      //이거는 뭔가?
      console.log(data);
      res.send("success");
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});
