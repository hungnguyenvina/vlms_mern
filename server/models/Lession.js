var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LessionSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: 'Please input section name'
    },
    description: {
        type: String,
        default: ''
    },
    type: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        default: ''
    },
    time: {
        type: Number,
        default: 0
    },
    free_preview: {
        type: Number,
        default: 0
    },
    course_id: { type: Schema.Types.ObjectId, ref: 'Course' },
    section_id: { type: Schema.Types.ObjectId, ref: 'Section' },
    status: {
        type: Number,
        default: 0
    }
});

var Lession = mongoose.model('Lession', LessionSchema);
module.exports = Lession;