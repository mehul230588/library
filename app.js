var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');



var app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.static('src/views'));
app.set('views', './src/views');
app.set('view engine', 'html');

app.use(cookieParser());
app.use(expressSession({secret:'library'}));
require('./src/config/passport')(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var bookRouter = require('./src/routes/bookRouter');
app.use('/Books', bookRouter);

var adminRouter = require('./src/routes/adminRouter');
app.use('/admin', adminRouter);

var authRouter = require('./src/routes/authRouter');
 app.use('/auth', authRouter);



app.get('/', function (request, response) {
    response.render('index');
});


app.get('/book', function (request, response) {
    response.send('Hello Books!');
});

app.listen(port, function (error) {
    console.log(`server started to listen at port ${port}`);
});