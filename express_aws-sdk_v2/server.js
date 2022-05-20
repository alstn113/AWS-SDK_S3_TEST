require("dotenv").config();
const express = require("express");

const { S3 } = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const app = express();

const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_KEY;
const region = process.env.S3_REGION;
const bucket = process.env.S3_BUCKET;

const s3 = new S3({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket,
    metadata: function (_req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (_req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

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
app.post("/upload", uploadS3.single("file"), (req, res) => {
  try {
    return res.send({ img: req.file.location, key: req.file.key });
  } catch (err) {
    console.log(err);
  }
});

// 단일 파일 삭제
app.delete("/:fileName", (req, res) => {
  try {
    s3.deleteObject(
      { Bucket: bucket, Key: req.params.fileName },
      (err, _data) => {
        if (err) {
          console.log(err);
        }
        res.send("Success");
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, () => {
  console.log("SERVER IS RUNNING");
});
