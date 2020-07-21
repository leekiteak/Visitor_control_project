//외부 내부 모듈들
var http = require('http');
var express = require('express');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');
var sync_request = require('sync-request');
var multer = require('multer');
var fs = require('fs');
var async = require('async');
var querystring = require('querystring');
var url = require('url');


var app = express();
var router = express.Router();

app.set('port', process.env.PORT || 3000);
app.use(static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


//메인 화면
router.route('/').get(function (req, res) {

    console.log("hello");
});


app.use('/', router);

var server = http.createServer(app).listen(app.get('port'), function () {
});
