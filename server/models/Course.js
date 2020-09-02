var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    title: {
        type: String,
        unique: false,
        required: 'Please input course title'
    },
    short_description: {
        type: String,
        default: ''
    },
    goal: {
        type: String,
        default: ''
    },
    requirement: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    course_picture_url: {
        type: String,
        default: ''
    },
    fee: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        default: 0
    },
    skill_level: {
        type: String,
        default: ''
    },
    language: {
        type: String,
        default: ''
    },
    course_category_id: { type: Schema.Types.ObjectId, ref: 'CourseCategory' },
    instructor_id: { type: Schema.Types.ObjectId, ref: 'Instructor' },
    message_to_instructor: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: 0
    }
});

var Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
  