const jwt = require('jsonwebtoken');

require('dotenv').config();

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token ontbreekt' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Ongeldige token' });
        req.user = user;
        next();
    });
}

module.exports = verifyToken;