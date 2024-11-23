// Import library yang diperlukan
const express = require('express');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const dotenv = require('dotenv');

// Inisialisasi dotenv untuk environment variables
dotenv.config();

// Inisialisasi express
const app = express();
const port = parseInt(process.env.PORT) || 3000;

// Set path ke file JSON dari service account
const keyPath = path.join(__dirname, 'config', 'service-account-key.json');

// Inisialisasi storage client dengan service account key
const storage = new Storage({
  keyFilename: keyPath,
});

// Contoh penggunaan bucket
const bucketName = 'skinpal-bucket1';
const bucket = storage.bucket(bucketName);

// Middleware JSON parser untuk menangani JSON payload
app.use(express.json());

// Basic route untuk testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SkinPal API' });
});

// Import routes
const uploadRoutes = require('./routes/uploadRoute');

// Routing untuk API upload
app.use('/api', uploadRoutes);

// Server listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});