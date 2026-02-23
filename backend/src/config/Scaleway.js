const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
require('dotenv').config();

const s3Client = new S3Client({
  endpoint: process.env.SCALEWAY_ENDPOINT,
  region: process.env.SCALEWAY_REGION,
  credentials: {
    accessKeyId: process.env.SCALEWAY_ACCESS_KEY,
    secretAccessKey: process.env.SCALEWAY_SECRET_KEY,
  }
});

const uploadToScaleway = async (file, folder = process.env.SCALEWAY_FOLDER) => {
  const fileName = `${folder}/${Date.now()}-${file.originalname}`;
  
  try {
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.SCALEWAY_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read'
      },
    });

    const result = await parallelUploads3.done();
    return result.Location || `https://${process.env.SCALEWAY_BUCKET_NAME}.s3.${process.env.SCALEWAY_REGION}.scw.cloud/${fileName}`;
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
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    return true;
  } catch (error) {
    throw new Error(`Erreur suppression Scaleway: ${error.message}`);
  }
};

module.exports = { s3: s3Client, uploadToScaleway, deleteFromScaleway };