const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();
const cityList = require('./src/city.list.json')

app.use(cors());

app.get('/getLocations', async (req, res) => {
    const list = cityList.filter(c => c.name.toLowerCase().startsWith(req.query.location.toLowerCase()))
    res.send(list)
})

app.get('/details', async (req, res) => {
    const id = req.query.id;
    const response = await axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=40.19899&lon=-75.476288&appid=ebc29ff2eb43de72257d2b23fb640257&units=imperial');
    res.send(response.data);
})

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);