const User = require('../modules/user.model');
const Twilio = require('twilio');

const twilioPhoneNumber = 'your_twilio_phone_number';
const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function createUser(mobileNumber) {
    try {
        const user = await User.findOne({ mobileNo: mobileNumber });
        if (user) {
            throw new Error('Mobile number already registered.');
        }

        const otp = generateOTP();
        const otpExpiration = new Date(Date.now() + 15 * 60 * 1000);

        await client.messages.create({
            body: `${otp} is your OTP for verifying your mobile number on LifeTime Lotto. OTP valid for 15 minutes.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: mobileNumber,
        });

        return User.create({ mobileNo: mobileNumber, mobileOtp: otp, otpExpiration });
    } catch (error) {
        throw error;
    }
}

async function verifyAndUpdateUser(mobileNumber, otp) {
    try {
        const user = await User.findOne({ mobileNo: mobileNumber });
        if (user && user.mobileOtp === otp) {
            if (user.otpExpiration > new Date()) {
                user.smsVerify = true;
                user.mobileOtp = undefined;
                user.otpExpiration = undefined;
                await user.save();
                return user;
            } else {
                throw new Error('OTP has expired. Please request a new OTP.');
            }
        }
        return null;
    } catch (error) {
        throw error;
    }
}
module.exports = { createUser, verifyAndUpdateUser };
