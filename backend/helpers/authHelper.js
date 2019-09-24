const { JWT_SECRET } = require('./constants');
const jwt = require('jsonwebtoken');

exports.generateToken = tokenData => {
    return jwt.sign({
        userId: tokenData.userId,
        nickname: tokenData.nickname
    }, JWT_SECRET, { expiresIn: '1h' });
}