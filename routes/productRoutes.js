var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const islogged = require('../middlewares/isLogged');

router.get('/add', islogged, productController.loadCreateForm);

router.post('/add', islogged, productController.createProduct);

router.get('/delete/:id', islogged, productController.deleteProduct);

router.get('/porMarca', islogged, productController.selectByBrand);

router.get('/brand/:id', islogged, productController.selectOfbrand);






module.exports = router;