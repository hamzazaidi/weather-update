const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

app.get('/getLocations', async (req, res) => {
    const locationUrl =
    `https://www.metaweather.com/api/location/search/?query=${req.query.location}`;
    const response = await axios.get(locationUrl);
    res.send(response.data)
})

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);