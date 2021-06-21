const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const cityList = require('./src/city.list.json')

app.use(cors());

app.get('/getLocations', async (req, res) => {
    const list = cityList.filter(c => c.name.toLowerCase().startsWith(req.query.location.toLowerCase()))
    res.send(list)
})

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/*', function (req, res) {

    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);