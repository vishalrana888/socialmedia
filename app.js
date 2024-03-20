const express = require('express');
const path = require('path');
const app = express();
var cors = require('cors')
const contactusRouter = require('./routes/contactus');
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(cors())
app.use('/contactus', contactusRouter);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});