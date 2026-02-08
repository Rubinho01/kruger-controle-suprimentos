var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController');
const islogged = require('../middlewares/isLogged');

router.get('/add', islogged, function(req,res,next){
    res.render('brand/createBrandForm');
});

router.post('/add', islogged, brandController.createbrand);



module.exports = router;