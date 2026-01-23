var express = require('express');
var router = express.Router();
const islogged = require('../middlewares/isLogged');;

/* GET users listing. */
router.get('/', islogged, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
