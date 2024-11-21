// Import library Google Cloud Storage
const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Set path ke file JSON dari service account
const keyPath = path.join(__dirname, 'config', 'service-account-key.json');

// Inisialisasi storage client dengan service account key
const storage = new Storage({
  keyFilename: keyPath,
});

// Contoh penggunaan bucket
const bucketName = 'your-bucket-name';
const bucket = storage.bucket(bucketName);