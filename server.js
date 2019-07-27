/**
 * Created by OmPrakashSharma on 27-07-2019.
 */
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multiparty = require('connect-multiparty');
const path = require('path');

const config = require('./config');
const port = config.PORT;
const multipartyMiddleware = multiparty();
var app = express();

app.set('port', port);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('public'))

/**
 * sample code for get request
 */
app.get('/dummy-api', function (req, res) {
    return res.send("Yes i am ..");
});

/**
 * sample code for post request
 */
app.post('/dummy-api', function (req, res) {
    let requestBody = req.body;
    return res.send(requestBody);
});

/**
 * To read multi part files from request
 */
app.post('/dummy-api', multipartyMiddleware, function (req, res) {
    let files = req.files;
    if(files && files.length){
        return res.send(files[0].name);
    }else{
        return res.send("no files found");
    }
});

app.listen(port, function () {
    console.log('Server is listening on *:' + port);
});