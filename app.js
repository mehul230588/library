var express = require('express');

var app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.static('src/views'));
app.set('views', './src/views');
app.set('view engine', 'angular');

app.get('/', function (request, response) {
    response.send('Hello World!');
});

app.get('/book', function (request, response) {
    response.send('Hello Books!');
});

app.listen(port, function (error) {
    console.log(`server started to listen at port ${port}`);
});