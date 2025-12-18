var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('loginForm');
});

router.get('/dashboard', function(req, res, next){
  res.render('right');
})


module.exports = router;
