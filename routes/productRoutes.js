var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');

router.get('/add', productController.loadCreateForm);

router.post('/add', productController.createProduct);






module.exports = router;