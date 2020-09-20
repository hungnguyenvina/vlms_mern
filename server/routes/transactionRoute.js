var express = require('express');
var router = express.Router();
const middleware = require('../middleware/middleware');
const transactionController = require('../controllers/transactionController');


router.post('/save_user_transaction',middleware.checkUserAuthenticate(), transactionController.saveUserTransaction);

module.exports = router;