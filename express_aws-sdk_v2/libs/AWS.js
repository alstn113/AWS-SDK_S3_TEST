const AWS = require("aws-sdk");

const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_KEY;
const region = process.env.S3_REGION;
AWS.config.update({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

module.exports = { AWS };
