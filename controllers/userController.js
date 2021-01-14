const { Router } = require('express');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userController = Router();

userController.get('/', (req, res) => {
  //req deconstruction
  User.findAll()
    .then((user) => {
      res.status(200).json({
        users: user,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

userController.post('/signup', (req, res) => {
  //req deconstruction
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12),
    username: req.body.username,
    phoneNumber: req.body.phonenumber,
    lastName: req.body.lastname,
    firstName: req.body.firstname,
    restaurantOwner: req.body.restaurantowner,
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

userController.post('/test', (req, res) => {
  //req deconstruction
  User.create({
    email: 'blood',
    password: 'blood',
    username: 'blood',
    restaurantOwner: false,
  })
    .then((user) => {
      res.status(200).json({
        user: user,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

userController.post('/signin', (req, res) => {
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

module.exports = userController;
