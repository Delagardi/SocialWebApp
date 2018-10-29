const express = require('express');
const router = express.Router();

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
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        newUser.save()
          .then(user => res.json(user))
          .catch(error => console.log('We get some error with saving: ' + error));

      }
    })
});

module.exports = router;