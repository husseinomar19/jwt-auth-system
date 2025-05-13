const express = require('express');
const authRoutes = require('./routes/auth');
const verifyToken = require('./verify/verifyToken');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

// Protected route
// app.get('/protected', verifyToken, (req, res) => {
//     res.json({ message: 'Toegang verleend', user: req.user });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server draait op poort ${PORT}`));
