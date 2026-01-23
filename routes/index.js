var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const islogged = require('../middlewares/isLogged')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('loginForm');
});

router.get('/dashboard',islogged, productController.loadDashboard );


module.exports = router;
