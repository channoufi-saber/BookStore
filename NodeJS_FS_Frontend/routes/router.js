const express = require('express');
const {validateRegistration,validateLogin}=require('../validation/validation');
const router = express.Router();
const isEmpty=require('../utilities/utils');
const messages=require('../utilities/messages');
const { postRegister,postLogin } = require('../services/userService');


router.get('/', (req, res) => {
  res.render('home', { pagename: 'Home' });
});

router.get('/login', (req, res) => {
  res.render('login', { pagename: 'Login' });
});

router.get('/register', (req, res) => {
  res.render('register', { pagename: 'Register' });
});

router.post('/register', (req, res) => {
  const errors = validateRegistration(req.body);
  if (isEmpty(errors)) {
    postRegister(req.body)
      .then((result) => {
        res.render('login', {
          pagename: 'Login',
          message: result.data.message,
        });
      })
      .catch((err) => {
        res.render('register', {
          pagename: 'Registration',
          message: err.response.data.error.message,
        });
      });
  } else {
    res.render('register', {
      pagename: 'Registration',
      body: req.body,
      errs: errors,
      message: messages.failed_registration,
    });
  }
});

router.post('/login',(req,res)=>{
  const errors=validateLogin(req.body);
  if (isEmpty(errors)) {
    postLogin(req.body)
    .then((result)=>{
      console.log(result.data);
      res.render('home',{
        pagename:'Home',
        message:result.data.message
      })
    })
    .catch((err)=>{
      res.render('login',{
        pagename:'Login',
        message:err.response.data.error.message,
      })
    })
  }else{
    res.render('login',{
      pagename:'Login',
      body:req.body,
      errs:errors,
      message:messages.failed_login,

    })
  }
})

router.get('/about', (req, res) => {
  res.render('about', { pagename: 'About' });
});


module.exports = router;