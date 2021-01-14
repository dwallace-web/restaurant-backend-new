const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
  //req deconstruction
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12),
    username: req.body.username,
    phonenumber: req.body.phonenumber,
    restaurantowner: req.body.restaurantowner,
  })
    .then((user) => {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '12h',
      });

      res.status(200).json({
        user: user,
        message: 'User registered!',
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post('/signin', (req, res) => {
  // console.log('login func start')

  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, matches) => {
        if (matches) {
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '12h',
          });

          res.status(200).json({
            user: user,
            message: 'Welcome Back',
            sessionToken: token,
          });
        } else {
          res.status(500).json({ error: 'Password does not match' });
        }
      });
    } else {
      res
        .status(500)
        .json({ error: 'This e-mail has not be used. Please Sign Up' });
    }
  });

  // console.log('login func end')
});

router.get('/', (req, res) => {
  //req deconstruction
  User.findAll()
    .then((user) => {
      res.status(200).json({
        users: user,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post('/test', (req, res) => {
  //req deconstruction
  User.create({
    email: 'blood',
    password: 'blood',
    username: 'blood',
    restaurantowner: false,
  })
    .then((user) => {
      res.status(200).json({
        user: user,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
