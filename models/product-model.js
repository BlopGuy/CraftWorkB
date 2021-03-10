const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    price: Number,
    imageUrl: String,
    description: String,
    ownedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;