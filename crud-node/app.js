var express = require('express');
var bodyParser = require('body-parser');
var router = require('./router');

var app = express();

app.use('/node_modules/', express.static('./node_modules/'));
app.use('/public/', express.static('./public/'));

//configure template engine and body-parser must in front of app.use(router);
app.engine('html', require('express-art-template'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//mount router on app serve
app.use(router);

app.listen(1122, function(){
    console.log('Running!');
});