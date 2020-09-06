var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    transaction_id: {
        type: String
    },
    transaction_date: {
        type: String
    },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    payer_id: {
        type: String,
        default: ''
    },
    payer_email: {
        type: String,
        default: ''
    },
    payer_name: {
        type: String,
        default: ''
    },
    total_amount: {
        type: Number,
        default: 0
    },
    currency_code: {
        type: String,
        default: 'USD'
    },
    transaction_details: {
        type: Array
        /* 
        [
            course_name: String,
            course_quantity: Number,
            course_price: Number,
            couse_currency_code: String, default 'USD'
        ]
        */
    },
    status: {
        type: String,
        default: 'COMPLETED'
    }
});

var Transaction = mongoose.model('Transaction', TransactionSchema);
module.exports = Transaction;