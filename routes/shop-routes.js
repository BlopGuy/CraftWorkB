const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Shop = require('../models/shop-model');
const fileUpload = require('../configs/cloudinary');

router.get('/shops', (req, res) => {
  Shop
    .find()
    .then((allShopsFromDB) => {
      res.status(200).json(allShopsFromDB);
    })
    .catch((error) => {
      res.status(500).json(`Error ocurred ${error}`);
    });
});

router.delete('/shops/:id', (req, res) => {
  Shop
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json(`Shop with id ${req.params.id} was deleted`);
    })
    .catch((error) => {
      res.status(500).json(`Error ocurred ${error}`);
    });
});

router.get('/shops/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json('Specified id is not valid');
    return;
  }

  Shop
    .findById(req.params.id)
    .then((shopFromDB) => {
      res.status(200).json(shopFromDB);
    })
    .catch((error) => {
      res.status(500).json(`Error ocurred ${error}`);
    });
});

router.put('/shops/:id', (req, res) => {
  const ShopWithNewData = req.body;

  Shop
    .findByIdAndUpdate(req.params.id, ShopWithNewData)
    .then(() => {
      res.status(200).json(`Shop with id ${req.params.id} was updated`);
    })
    .catch((error) => {
      res.status(500).json(`Error ocurred ${error}`);
    });
});

router.post('/shops', (req, res) => {
  const { shopName, imageUrl, productList, ownedBy } = req.body;
  console.log('this',req.body)

  if (!shopName ) {
    res.status(400).json('Missing fields');
    return;
  }

  Shop
    .create({
      shopName,
      imageUrl,
      productList,
      ownedBy
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