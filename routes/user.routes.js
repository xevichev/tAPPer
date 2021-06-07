const { Router } = require('express');
const router=Router();

const User = require('../models/User');

const verifyToken= require('./verifyToken');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET= process.env.SECRET;

router.post('/signup', async (req, res ,next ) => {
   const { username, email, password }= req.body

   const user= new User({
       username:username,
       email:email,
       password:password
   });
   user.password= await user.encryptPassword(user.password);
   console.log(user);
   await user.save();

   const token = jwt.sign({id: user._id}, SECRET, {
    expiresIn: 60*60*24
   })
   res.json({auth:true, token})
   
})

router.post('/login', async (req, res ,next ) => {

    const{email, password} = req.body;
    const user= await User.findOne({email: email});
    if (!user){
        return res.status(404).send("the mail doesn't exists")
    }

    const validPassword=  await user.validatePassword(password);
    if(!validPassword){
        return res.status(401).json( {auth: false, token:null})
    }


    const token = jwt.sign({id:user._id}, SECRET, {
        expiresIn:60*60*24
    })


    res.json({auth: true, token});
})

router.get('/profile', verifyToken, async (req, res ,next ) => {

const user = await User.findById(userId, {password:0}); //password 0, només serveix perque no em retorni la password a l'objecte user. xk despres no sem vegi a la linia 53.

if(!user){
    return res.status(404).send('no user found')
} ;

res.json(user)
   
})

module.exports= router;