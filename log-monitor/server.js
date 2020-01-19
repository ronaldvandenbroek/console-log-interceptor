// Imports
const express = require('express')
const cors = require('cors');

// Setup
const app = express()
app.use(express.json())
app.use(cors());
var whitelist = ['http://localhost:4200']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions));

// Config
const port = process.argv[2] || 8888;

// Route that receives a POST request to /log
app.post('/log', function (req, res) {
    const body = req.body['0'];
    console.log(body);
    res.status(200).send();
})
app.listen(port, function (err) {
    if (err) {
        throw err
    }
    console.log(`Server started on port ${port}`)
})