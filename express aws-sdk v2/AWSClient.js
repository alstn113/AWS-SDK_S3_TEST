const AWS = require("aws-sdk");
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY;
const S3_SECRET_KEY = process.env.S3_SECRET_KEY;
const S3_REGION = process.env.S3_REGION;

AWS.config.update({ region: S3_REGION, credentials: { accessKeyId: S3_ACCESS_KEY, secretAccessKey: S3_SECRET_KEY } });

module.exports = { AWS };
