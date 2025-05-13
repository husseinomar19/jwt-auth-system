const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const users = require('../users');




const router = express.Router();

router.post('/register' , async (req , res) =>{

    

  const { name , email , password ,rol } = req.body;


  

  

  const bestaat = users.find(u => u.email === email);

  if(bestaat) return res.status(400).send({ message: 'Email already exists' });

  const hashedPassword = await bcrypt.hash(password , 10);

   const user = { name , email , password : hashedPassword , rol };

   users.push(user);


   res.status(201).json({message : 'User created successfully' });

} )


// LOGIN
router.post('/login', async (req, res) => {
    const { email, wachtwoord } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(400).json({ message: 'Gebruiker niet gevonden' });

    const geldig = await bcrypt.compare(wachtwoord, user.wachtwoord);
    if (!geldig) return res.status(401).json({ message: 'Verkeerd wachtwoord' });

    const token = jwt.sign(
        { naam: user.naam, email: user.email, rol: user.rol },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });
});

module.exports = router;