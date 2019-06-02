var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SectionSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: 'Please input section name'
    },
    description: {
        type: String,
        default: ''
    },
    course_id: { type: Schema.Types.ObjectId, ref: 'Course' },
    status: {
        type: Number,
        default: 0
    }
});

var Section = mongoose.model('Section', SectionSchema);
module.exports = Section;
  