require('dotenv').config(); // Add this at the very top of your file

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const auth = require('./routes/API/auth');
const profile = require('./routes/API/profile');
const questions = require('./routes/API/questions');

const app = express();

// Middleware
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// Database connection - now using environment variable
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log(err));

app.get('/', function(req, res) {
    res.send('<h1>Hello server connected</h1>');
});

app.use('/API/auth', auth);
app.use('/API/questions', questions);
app.use('/API/profile', profile);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});