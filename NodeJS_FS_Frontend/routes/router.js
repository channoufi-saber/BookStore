const express = require('express');
const {validateRegistration,validateLogin}=require('../validation/validation');
const router = express.Router();
const isEmpty=require('../utilities/utils');
const messages=require('../utilities/messages');
const { postRegister,postLogin } = require('../services/userService');
let session=require('express-session');
require('dotenv').config();

router.use(
  session({
    secret:process.env.secret,
    resave:false,
    saveUninitialized:true,
  })
  );


router.get('/', (req, res) => {
  session=req.session;
  res.render('home', { pagename: 'Home',session:session });
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
  session=req.session;
  const errors=validateLogin(req.body);
  if (isEmpty(errors)) {
    postLogin(req.body)
    .then((result)=>{
      console.log(result.data);
      session.name=result.data.user.firstName;
      session.logged=result.data.logged;
      session.token=result.data.token;
      res.render('home',{
        pagename:'Home',
        message:result.data.message,
        session:session,
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
  session=req.session;
  res.render('about', { pagename: 'About',session:session });
});


module.exports = router;