const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const users = require('../users');
const { use } = require('react');



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