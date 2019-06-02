var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var QuestionCategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: 'Please input category name',
        maxlength: 500
    },
    description: {
        type: String,
        trim: true
    },
    question_category_parent_id: {
        type: Schema.Types.ObjectId,
        ref: 'QuestionCategory'
    },
    status: {
        type: Number,
        default:0
    }
})

var QuestionCategory = mongoose.model('QuestionCategory',QuestionCategorySchema);
module.exports = QuestionCategory;   