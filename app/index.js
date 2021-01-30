//require modules
require('dotenv').config()
const express =  require('express');
const bodyParser = require('body-parser');
const app = express();

const router = require('./routes')

const port = process.env.PORT || 7000;
app.use(bodyParser.json());

app.use('/', router)

app.listen(port,() => {
    console.log(`rule validation is running on port: ${port}`)
})

module.exports = app;