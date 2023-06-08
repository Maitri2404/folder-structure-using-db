const mongoose = require('mongoose');
// const config = require('./config/config');

mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB connected!'))
  .catch((error) => console.error('MongoDB connection error:', error));
