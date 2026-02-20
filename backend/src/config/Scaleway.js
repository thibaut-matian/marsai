const AWS = require('aws-sdk');
require('dotenv').config();

const s3 = new AWS.S3({
  endpoint: process.env.SCALEWAY_ENDPOINT,
  accessKeyId: process.env.SCALEWAY_ACCESS_KEY,
  secretAccessKey: process.env.SCALEWAY_SECRET_KEY,
  region: process.env.SCALEWAY_REGION,
  signatureVersion: 'v4'
});

const uploadToScaleway = async (file, folder = process.env.SCALEWAY_FOLDER) => {
  const fileName = `${folder}/${Date.now()}-${file.originalname}`;
  
  const params = {
    Bucket: process.env.SCALEWAY_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'
  };

  try {
    const result = await s3.upload(params).promise();
    return result.Location;
  } catch (error) {
    throw new Error(`Erreur upload Scaleway: ${error.message}`);
  }
};

const deleteFromScaleway = async (fileUrl) => {
  const key = fileUrl.split('.cloud/')[1];
  
  const params = {
    Bucket: process.env.SCALEWAY_BUCKET_NAME,
    Key: key
  };

  try {
    await s3.deleteObject(params).promise();
    return true;
  } catch (error) {
    throw new Error(`Erreur suppression Scaleway: ${error.message}`);
  }
};

module.exports = { s3, uploadToScaleway, deleteFromScaleway };