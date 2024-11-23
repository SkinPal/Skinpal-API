const express = require('express');
const multer = require('multer');
const { uploadImage } = require('../controllers/uploadController');
const router = express.Router();

// Inisialisasi multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route untuk upload image
router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;