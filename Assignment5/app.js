const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const mainRoutes = require('./routes/mainRoutes');
const sequelize = require('./util/database');
const errorController = require('./controllers/error');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(mainRoutes);
app.use(errorController.getError)

sequelize
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });