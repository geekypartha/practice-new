const generateToken = require('../Utils/generateToken');
const User = require('../models/userModel');
const asynchandler = require('express-async-handler')

const registerUser = asynchandler(async(req,res)=>{
    const {name, email, password}= req.body;

    const userExist = await User.findOne({email});

    if(userExist){
        res.status(401)
        throw new Error("Users already exist");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("error occured")
    }

});

const authUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email});

  if (user && user.matchPassword(password)) {
    res.send({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(401);
    throw new Error("email or password doesn't matched");
  }
  
});

module.exports = {registerUser, authUser}