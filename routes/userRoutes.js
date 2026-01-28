var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const isLogged = require('../middlewares/isLogged')

/* GET users listing. */
router.post('/login', userController.join);

router.get('/logout',  isLogged, userController.logout);

module.exports = router;
