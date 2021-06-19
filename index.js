const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;


//create express app
const app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//Configuring database
const dbConfig = require('./config/database.config');
const mongoose = require('mongoose');

mongoose.promise = global.Promise;

//Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log('Successfully connected to database');
}).catch((err) => {
    console.log('Could not connected to database', err);
    process.exit();
});

//rest
app.get('/', (req,res) => {
    res.json({
        "message": "Welcome to Node with Mongo"
    });
});

require('./app/routes/note-route')(app);

app.listen(port, () => {
    console.log(`Server is Listeninig on Port ${port}`);
});
