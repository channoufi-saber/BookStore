const express = require('express');
const {validateRegistration,validateLogin}=require('../validation/validation');
const router = express.Router();
const isEmpty=require('../utilities/utils');
const messages=require('../utilities/messages');
const { postRegister } = require('../services/userService');


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
    // call the backend
    postRegister(req.body)
      .then((result) => {
        res.render('login', {
          pagename: 'Login',
          message: result.data.message,
        });
      })
      .catch((err) => {
        res.render('register', {
          pagename: 'Registration'
     //     message: err.response.data.error.message,
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

router.get('/about', (req, res) => {
  res.render('about', { pagename: 'About' });
});


module.exports = router;