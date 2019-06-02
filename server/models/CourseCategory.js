var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CourseCategorySchema = new Schema({
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
    course_category_parent_id: {
        type: Schema.Types.ObjectId,
        ref: 'CourseCategory'
    },
    status: {
        type: Number,
        default:0
    }
})

var CourseCategory = mongoose.model('CourseCategory',CourseCategorySchema);
module.exports = CourseCategory;   