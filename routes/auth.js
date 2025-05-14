const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // importeer jouw knex instantie

const router = express.Router();

// REGISTREREN
router.post('/register', async (req, res) => {
    const { name, email, password, rol } = req.body;

     // 🔒 Validatie: check op lege velden
    if (!name || !email || !password || !rol) {
        return res.status(400).json({
            message: 'Alle velden zijn verplicht: naam, email, wachtwoord en rol'
        });
    }

    try {
        // Check of gebruiker al bestaat
        const bestaat = await db('users').where({ email }).first();
        if (bestaat) return res.status(400).json({ message: 'Email bestaat al' });

        // Hash wachtwoord
        const hashedPassword = await bcrypt.hash(password, 10);

        // Voeg gebruiker toe aan DB
        await db('users').insert({
            name,
            email,
            password: hashedPassword,
            rol
        });

        res.status(201).json({ message: 'Gebruiker succesvol aangemaakt' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server fout' });
    }
});


// INLOGGEN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if( !email || !password ) {
        return res.status(400).json({ message: 'Email en wachtwoord zijn verp licht' });
    }

    try {
        // Zoek gebruiker
        const user = await db('users').where({ email }).first();
        if (!user) return res.status(400).json({ message: 'Gebruiker niet gevonden' });

        // Vergelijk wachtwoord
        const geldig = await bcrypt.compare(password, user.password);
        if (!geldig) return res.status(401).json({ message: 'Verkeerd wachtwoord' });

        // Genereer token
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
                rol: user.rol
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server fout' });
    }
});

module.exports = router;