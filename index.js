const FilesController = require('./controller/Routes/files');
const routes = require('./controller/Routes/routes');

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const axios = require('axios');

app.use(upload.array('avatar', 2))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/src/js'));
app.use(express.static(__dirname + '/src/css'));
app.use(express.static(__dirname + '/src/images'));

routes(app);
FilesController(app);


app.listen(8080, () => {
    console.log("Server Started")
});