var express = require('express');
var router = express.Router();
const middleware = require('../middleware/middleware');

const questionCategoryController = require('../controllers/questionCategoryController');

router.get('/', middleware.checkAdminAuthenticate(), questionCategoryController.getAllQuestionCategories);

//router.get('/question_categories1',middleware.checkAdminAuthenticate(), questionCategoryController.getAllQuestionCategories1);

router.post('/', middleware.checkAdminAuthenticate(), questionCategoryController.createQuestionCategory);

router.put('/:id', middleware.checkAdminAuthenticate(), questionCategoryController.updateQuestionCategory);

router.delete('/:id', middleware.checkAdminAuthenticate(), questionCategoryController.deleteQuestionCategory);

module.exports = router;