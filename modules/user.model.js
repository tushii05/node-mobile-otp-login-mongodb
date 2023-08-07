const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    mobileNo: {
        type: String,
        required: true,
        unique: true,
    },
    mobileOtp: String,
    otpExpiration: Date,
    smsVerify: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
