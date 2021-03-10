const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  name: String
});
/*
const shopSchema = new Schema({
  shopName: {
    type: String,
    trim: true,
    required: [true, 'Shop name is required']
   // unique: true
  },
  imageUrl: String,
  productList: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  ownedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});
*/
const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;