const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');


const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys.js').mongoURI;

// MongoDB
mongoose
  .connect(db, {useNewUrlParser: true })
  .then( () => console.log('MongoDB connected'))
  .catch(error => console.log('Error with MongoDB: ' + error));


app.get('/', (req, res) => res.send('Hello everybody! Learning REST API'));

// Using Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

const port = 5000;

app.listen(port, () => console.log(`App running on port ${port}`));