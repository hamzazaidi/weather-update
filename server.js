const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();
const cityList = require('./app/src/city.list.json')
const countryList = require('./app/src/countries.json')
const stateList = require('./app/src/states.json')

app.use(cors());

app.get('/getLocations', async (req, res) => {
    try {
        const list = cityList.filter(c => c.name.toLowerCase().startsWith(req.query.location.toLowerCase()))
        const populatedList = list.map(item => ({
            ...item,
            country: countryList.find(c => c.code === item.country).name || item.country,
            state: stateList[item.state] || item.state
        }))
        res.send(populatedList);
    } catch (error) {
        res.sendStatus(500);
    }
})

app.get('/details', async (req, res) => {
    try {
        const lat = req.query.lat;
        const lon = req.query.lon;
        const unit = req.query.unit || 'imperial'
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ebc29ff2eb43de72257d2b23fb640257&units=${unit}`);
        res.send(response.data);    
    } catch (error) {
        res.sendStatus(500);
    }
})

// Serve only the static files form the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);