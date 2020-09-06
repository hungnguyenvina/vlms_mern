var express = require('express');
var router = express.Router();
const checkAuthenticate = require('../middleware/middleware');
const transactionController = require('../controllers/transactionController');


router.post('/save_user_transaction',checkAuthenticate(), transactionController.saveUserTransaction);

module.exports = router;