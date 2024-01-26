const {findUser,saveUser}=require('../db/db');
const errorTemplate=require('../templates/errorTemplate');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const bcrypt=require('bcrypt');
const User=require('../models/userModel');
const mongoose=require('mongoose');

exports.registerUser = async (req, res) => {
  try {
    const user = await findUser({ email: req.body.email });
    if (user) {
      throw new Error('User exist, try logging in');
    } else {
      const user = new User();
      user._id = mongoose.Types.ObjectId();
      const newUser = Object.assign(user, req.body);
      const hash = await bcrypt.hash(newUser.password, 10);
      newUser.password = hash;
      const savedUser = await saveUser(newUser);
      return res.status(201).json({
        message: 'Successful Registration',
        user: savedUser,
      });
    }
  } catch (e) {
    return errorTemplate(res, e, e.message);
  }
};

exports.loginUser=async(req,res)=>{
try{
	const loggedUser=await findUser({email:req.body.email});
	if(!loggedUser){
		throw new Error('Authentication Failed: Unable to find user');
	}else{
		const result=await bcrypt.compare(
			req.body.password,
			loggedUser.password
			);
		if(result){
			loggedUser.password=null;
			const token=jwt.sign({user:loggedUser},process.env.jwt_secret);
			return res.status(201).json({
				user:loggedUser,
				logged:true,
				token:token,
				message:'Login Successful',
			});
		}else {
			throw new Error(
				'Authentication Failed: Email or password does not match'
				)
		}
	}
} catch(e){
	return errorTemplate(res,e,e.message);
}

}