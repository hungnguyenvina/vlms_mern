var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var InstructorSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    certificates: {
        type: String,
        default: ''
    },
    teaching_area: {
        type: String,
        default: ''
    },
    biography: {
        type: String,
        default: ''
    },
    avatar_url: {
        type: String,
        default: ''
    }
});

var Instructor = mongoose.model('Instructor', InstructorSchema);
module.exports = Instructor;