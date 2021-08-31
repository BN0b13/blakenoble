const express = require('express');
const path = require('path');
const router = express.Router();
const Contact = require('../models/Contact');

router.get('/', (req, res) => {
  const homepage = (path.join(process.cwd(), '/public/html/index.html'));
  res.sendFile(homepage);
});

router.get('/thankyou', (req, res) => {
  const thankyou = (path.join(process.cwd(), '/public/html/thankyou.html'));
  res.sendFile(thankyou);
});

router.get('/brickbreaker', (req, res) => {
  const bb = (path.join(process.cwd(), '/public/html/bb.html'));
  res.sendFile(bb);
});

router.get('/dogger', (req, res) => {
  const dogger = (path.join(process.cwd(), '/public/html/dogger.html'));
  res.sendFile(dogger);
});

router.get('/calculator', (req, res) => {
  const cal = (path.join(process.cwd(), '/public/html/calculator.html'));
  res.sendFile(cal);
});

router.get('/herofight', (req, res) => {
  const hero = (path.join(process.cwd(), '/public/html/hero.html'));
  res.sendFile(hero);
});

router.post('/contact', (req, res) => {
  const { name = null, number = null, email = null, message = null } = req.body;

  const post = new Contact({
    name: name,
    number: number,
    email: email,
    message: message
  });
  try {
    post.save();
    res.redirect(`/thankyou`);
  } catch(err) {
    res.send('There was an error' + err);
  };
});


module.exports = router;