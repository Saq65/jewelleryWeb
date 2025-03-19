const express = require('express');
const { UploadProduct, GetProduct, ProductInfo } = require('../controllers/productcontroller');
const router = express.Router();

router.post('/upload', UploadProduct);
router.get('/getproduct', GetProduct);
router.get('/getproduct/:slug', ProductInfo);

module.exports = router; 