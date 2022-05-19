const AWS3 = require("@aws-sdk/client-s3");
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
const S3_SECRET_KEY = process.env.S3_SECRET_KEY;
const S3_REGION = process.env.S3_REGION;

// region 타입이 없는데?...
const s3Instance = new AWS3.S3Client({ credentials: { accessKeyId: S3_ACCESS_KEY, secretAccessKey: S3_SECRET_KEY, region: S3_REGION } });
module.exports = { s3Instance };
