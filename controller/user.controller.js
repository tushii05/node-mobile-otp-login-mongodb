const userService = require('../service/user.service');

async function registerUser(req, res) {
    const { mobileNumber } = req.body;
    try {
        const user = await userService.createUser(mobileNumber);
        res.json({ message: 'User registered successfully.', user });
    } catch (error) {
        console.error('User registration failed:', error);
        res.status(500).json({ error: 'User registration failed.' });
    }
}

async function loginUser(req, res) {
    const { mobileNumber, otp } = req.body;
    try {
        const user = await userService.verifyAndUpdateUser(mobileNumber, otp);
        if (user) {
            res.json({ message: 'User logged in successfully.', user });
        } else {
            res.status(401).json({ error: 'Invalid OTP or mobile number.' });
        }
    } catch (error) {
        console.error('Login failed:', error);
        res.status(500).json({ error: 'Login failed.' });
    }
}

module.exports = { registerUser, loginUser };
