const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('./models/User');
const userController = require('./controllers/userController');

function catchErrors(fn) {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};


router.post('/contacts', catchErrors(userController.addContact));

router.get('/contacts', catchErrors(userController.getContacts));

router.post('/contact-update', catchErrors(userController.updateContact));

router.post('/contact-delete', catchErrors(userController.deleteContact));


module.exports = router;
