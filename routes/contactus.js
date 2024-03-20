const express = require('express');
const router = express.Router();
const contactusController = require('../controllers/contactusController');

// Define routes using the methods in contactusController
router.get('/', contactusController.getContactPage);
router.post('/', contactusController.postContactForm);

module.exports = router;
