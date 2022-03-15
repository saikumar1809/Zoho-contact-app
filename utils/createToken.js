const jwt = require('jsonwebtoken')
const createToken = (id, req, res) => {
    const cookieOptions = {
        expires: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000
        ),

    };
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '20d',
    });
    res.cookie('jwt', token, cookieOptions);
    return token;
};


module.exports = createToken;