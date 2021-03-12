const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  shopName: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  productList: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  ownedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  imageUrl: String
});
const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;