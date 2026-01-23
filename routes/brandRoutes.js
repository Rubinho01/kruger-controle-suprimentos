var express = require('express');
var router = express.Router();
const brandController = require('../controllers/brandController');

router.get('/add', function(req,res,next){
    res.render('brand/createBrandForm');
});

router.post('/add', brandController.createbrand);


module.exports = router;