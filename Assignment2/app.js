const express = require('express');
const bodyParser = require('body-parser');

const mainRoute = require('./routes/mainRoute');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(mainRoute);

app.listen(3000);