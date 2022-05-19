const { S3Client } = require("@aws-sdk/client-s3");

const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_KEY;
const region = process.env.S3_REGION;

const s3Client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

module.exports = { s3Client };
