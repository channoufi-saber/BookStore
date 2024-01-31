const express = require('express');
const {validateRegistration,validateLogin}=require('../validation/validation');
const router = express.Router();
const isEmpty=require('../utilities/utils');
const messages=require('../utilities/messages');

router.get('/', (req, res) => {
  res.render('home', { pagename: 'Home' });
});

router.get('/login', (req, res) => {
  res.render('login', { pagename: 'Login' });
});

router.get('/register', (req, res) => {
	const errors=validateRegistration(req.body);
  if (isEmpty(errors)) {
    res.render('login',{
      pagename:'Login',
      message:messages.successful_registration
    })
  }else{
  res.render('register', { 
    pagename: 'Registration',
    body:req.body,
    errs:errors,
    message:messages.failed_registration
     });

  }
});

router.get('/about', (req, res) => {
  res.render('about', { pagename: 'About' });
});


module.exports = router;