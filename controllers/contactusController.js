// Import any necessary modules
const bodyParser = require('body-parser');
const express = require('express');
// Define your router
const router = express.Router();

// Use body-parser middleware to parse URL-encoded data
router.use(bodyParser.urlencoded({ extended: true }));

// Define your route handlers
const getContactPage = (req, res) => {
    res.render('contactus', { path: '/contactus' }); // Render the contactus.ejs template
};

const postContactForm = (req, res) => {
    // Ensure that req.body is defined and contains the expected properties
    if (req.body && req.body.name && req.body.email && req.body.phone) {
        console.log('Received contact form submission:');
        console.log('Name:', req.body.name);
        console.log('Email:', req.body.email);
        console.log('Phone Number:', req.body.phone);
        
        // Redirect the user or render a thank you page
        res.send(`<img src="/images/thanks.jpg" alt="Image">`);
     } else {
        // Handle the case where form data is missing or incomplete
        res.status(400).send('Invalid form data');
    }
};

// Export your route handlers
module.exports = {
    getContactPage,
    postContactForm
};
