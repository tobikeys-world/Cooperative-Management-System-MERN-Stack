const mongoose = require('mongoose')

const loanSchema = new mongoose.Schema({
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    interest: Number,
    status: String,
    repaymentDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Loan", loanSchema);