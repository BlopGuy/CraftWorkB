const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product-model');
const fileUpload = require('../configs/cloudinary');

router.get('/products', (req, res) => {
  Product
    .find()
    .then((allProductsFromDB) => {
      res.status(200).json(allProductsFromDB);
    })
    .catch((error) => {
      res.status(500).json(`Error ocurred ${error}`);
    });
});

router.delete('/products/:id', (req, res) => {
  Product
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json(`Product with id ${req.params.id} was deleted`);
    })
    .catch((error) => {
      res.status(500).json(`Error ocurred ${error}`);
    });
});

router.get('/products/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json('Specified id is not valid');
    return;
  }

  Product
    .findById(req.params.id)
    .then((productFromDB) => {
      res.status(200).json(productFromDB);
    })
    .catch((error) => {
      res.status(500).json(`Error ocurred ${error}`);
    });
});

router.put('/products/:id', (req, res) => {
  const productWithNewData = req.body;

  Product
    .findByIdAndUpdate(req.params.id, productWithNewData)
    .then(() => {
      res.status(200).json(`Product with id ${req.params.id} was updated`);
    })
    .catch((error) => {
      res.status(500).json(`Error ocurred ${error}`);
    });
});

router.post('/products', (req, res) => {
  const { name, price, imageUrl, minimumOrder, description } = req.body;
  console.log(req.body)

  if (!name || !imageUrl || !minimumOrder || !description || !price) {
    res.status(400).json('Missing fields');
    return;
  }
  Product
    .create({
      name,
      price,
      imageUrl,
      minimumOrder,
      description
    })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json(`Error ocurred ${error}`);
    });
});

router.post('/upload', fileUpload.single('file'), (req, res) => {
  try {
    res.status(200).json({ fileUrl: req.file.path });
  }
  catch (error) {
    res.status(500).json(`Error ocurred ${error}`);
  };

});


module.exports = router;