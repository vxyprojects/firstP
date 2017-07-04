var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs")
var http = require("http");
//console.log(http)

//app.set('views', __dirname + '/node_view');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({extended: false}))

//app.use(express.static('script'))


var server = app.listen(3000, function () {
    console.log("Express server has started on port 3000")
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));


//var oRequestParam = {
//    Header: 'Authorization: Bearer GBhBdv57zhHX1TI47qqDXUVAEoqepidE2Vq7QwopdaYAAAFcMQMsZA',
//    HTTPMethod: 'POST',
//    URL: 'https://kapi.kakao.com/v1/api/talk/memo/send',
//    Parameter: 'template_id=4024'
//};
//
//http.request(oRequestParam, function (res) {
////    console.log(res);
//    console.log('STATUS: ' + res.statusCode);
//    console.log('HEADERS: ' + JSON.stringify(res.headers));
//    res.setEncoding('utf8');
//    res.on('data', function (chunk) {
//        console.log('BODY: ' + chunk);
//    });
//}).end();

//var router = require('main')(app, fs);
var router = require('./main')(app, fs);