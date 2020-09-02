var express = require('express');
var router = express.Router();

const questionCategoryController = require('../controllers/questionCategoryController');

router.get('/',  questionCategoryController.getAllQuestionCategories);

router.get('/question_categories1',questionCategoryController.getAllQuestionCategories1);

router.post('/', questionCategoryController.createQuestionCategory);

router.put('/:id', questionCategoryController.updateQuestionCategory);

router.delete('/:id', questionCategoryController.deleteQuestionCategory);

module.exports = router;