const express = require('express');
const path = require('path');
const router = express.Router();
const Contact = require('../models/Contact');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get('/', (req, res) => {
  const homepage = (path.join(process.cwd(), '/public/html/index.html'));
  res.sendFile(homepage);
});

router.get('/thankyou', (req, res) => {
  const thankyou = (path.join(process.cwd(), '/public/html/thankyou.html'));
  res.sendFile(thankyou);
});

router.get('/dogger', (req, res) => {
  const dogger = (path.join(process.cwd(), '/public/html/dogger.html'));
  res.sendFile(dogger);
});

router.get('/calculator', (req, res) => {
  const cal = (path.join(process.cwd(), '/public/html/calculator.html'));
  res.sendFile(cal);
});

router.get('/weather', (req, res) => {
  const weather = (path.join(process.cwd(), '/public/html/weather.html'));
  res.sendFile(weather);
});

router.get('/herofight', (req, res) => {
  const hero = (path.join(process.cwd(), '/public/html/hero.html'));
  res.sendFile(hero);
});

router.post('/api/weather', async (req, res) => {
  const { lat, long } = req.body;
  console.log('Hit Weather API');
  

  const api = await fetch(`https://api.weather.gov/points/${lat},${long}`)
  .then(response => response.json())
  .then(data => {
    const weatherAPI = fetch(data.properties.forecast)
    .then(response => response.json())
    .then(data => {
      const weather = data.properties.periods;
      const temp = data.properties.periods[0].temperature;
      res.send(JSON.stringify(weather));
    });

  });
})

router.post('/contact', (req, res) => {
  const { name = null, number = null, email = null, message = null, remainEmpty = null } = req.body;

  if(remainEmpty.length >= 1) {
    return res.sendStatus(403);
  }
  if(remainEmpty.length <= 0) {
    const post = new Contact({
      name: name,
      number: number,
      email: email,
      message: message
    });
    try {
      post.save();
      res.sendStatus(200);
    } catch(err) {
      res.send('There was an error' + err);
    };
  }
});


module.exports = router;