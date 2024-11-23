const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Inisialisasi Google Cloud Storage
const keyPath = path.join(__dirname, '../config/service-account-key.json');
const bucketName = 'skinpal-bucket1';

const storage = new Storage({
  keyFilename: keyPath,
});

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const fileName = `uploads/${Date.now()}_${req.file.originalname}`;
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);
    
    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on('error', (err) => {
      console.error('Upload to GCS failed:', err);
      return res.status(500).json({ message: 'Failed to upload image.' });
    });

    stream.on('finish', async () => {
      await file.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

      return res.status(200).json({
        message: 'Image uploaded successfully!',
        publicUrl
      });
    });

    stream.end(req.file.buffer);
  } catch (error) {
    console.error('Error handling upload:', error);
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
};

module.exports = { uploadImage };
