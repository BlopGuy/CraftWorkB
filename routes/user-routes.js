const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user-model');
const fileUpload = require('../configs/cloudinary');

router.delete('/users/:id', (req, res) => {
  User
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json(`User with id ${req.params.id} was deleted`);
    })
    .catch((error) => {
      res.status(500).json(`Error ocurred ${error}`);
    });
});

router.get('/users/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json('Specified id is not valid');
    return;
  }
  User
    .findById(req.params.id)
    .then((userFromDB) => {
      res.status(200).json(userFromDB);
    })
    .catch((error) => {
      res.status(500).json(`Error ocurred ${error}`);
    });
});

router.put('/users/:id', (req, res) => {
  const userWithNewData = req.body;

  User
    .findByIdAndUpdate(req.params.id, userWithNewData)
    .then(() => {
      res.status(200).json(`User with id ${req.params.id} was updated`);
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