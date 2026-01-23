var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const islogged = require('../middlewares/isLogged');

router.get('/add', islogged, productController.loadCreateForm);

router.post('/add', islogged, productController.createProduct);






module.exports = router;