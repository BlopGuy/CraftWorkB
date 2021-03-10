const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'User name is required'],
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password is required']
  },
  googleId: String,
  shoppingCart: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  shop: {
    type: Schema.Types.ObjectId,
    ref: 'Shop'
  },
  credits: Number
});

const User = mongoose.model('User', userSchema);

module.exports = User;