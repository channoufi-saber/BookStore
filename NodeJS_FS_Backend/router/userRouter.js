const express =require('express');
const {saveUser,findUser}=require('../db/db');
const bcrypt=require('bcrypt');
const User =require('../models/userModel');
const mongoose=require('mongoose');
const errorTemplate = require('../templates/errorTemplate');
const { loginUser, registerUser } = require('../services/userService');
const router=express.Router()

router.post('/register', registerUser);


router.post('/login',loginUser)

module.exports=router ;