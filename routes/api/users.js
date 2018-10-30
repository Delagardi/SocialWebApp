const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys.js');

// Load User model
const User = require('../../models/User');

router.get('/test', (req, res) => res.json({
  message: "Users Test is working"
}));

router.post('/registration', (req, res) => {
  // Using mongoose method findOne
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (user) {
        return res.status(400).json({
          email: 'Sorry, email already exists'
        });
      } else {
        const avatar = gravatar.url(
          'req.body.email', {
            s: '200', 
            r: 'pg', 
            d: 'mm'
          }
        );

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) throw error;
            newUser.password = hash;

            newUser.save()
              .then(user => res.json(user))
              .catch(error => console.log('We get some error with saving: ' + error));
          })
        });
      }
    })
});

router.post('/login', (req, res) => {
  User
    .findOne({
      email: req.body.email
    })
    .then(user => {
      if(!user) {
        return res.status(404).json({
          message: "User not found"
        })
      }

      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id, 
            name: user.name,
            email: user.email,
            date: Date.now()
          }

          // Creating token that expires in 24h
          jwt.sign(
            payload, 
            keys.tknKey, 
            { expiresIn: 86400 }, 
            (error, token) => {
              if (error) {
                return res.status(400).json({
                  message: "We have some problem with token creation"
                })
              }
              res.json({
                message: "Well done!",
                token: 'Bearer ' + token
              });
            }
          );
          // res.json({
          //   message: "Well done!"
          // });
        } else {
          res.status(400).json({
            message: "Password is incorrect"
          });
        }
      })
    });
});

module.exports = router;