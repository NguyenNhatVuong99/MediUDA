var createError = require('http-errors');
var express = require('express');
var fs = require('fs');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();
const data_appoint = JSON.parse(fs.readFileSync('./json/appoint.json', 'utf8'));
const data_service = JSON.parse(fs.readFileSync('./json/service.json', 'utf8'));
const data_feedback = JSON.parse(fs.readFileSync('./json/feedback.json', 'utf8'));
const data_employee = JSON.parse(fs.readFileSync('./json/employee.json', 'utf8'));
const data_time = JSON.parse(fs.readFileSync('./json/time.json', 'utf8'));
console.log(data_time);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.get('/', function (req, res, next) {
    res.render('index',
        {
            service: data_service,
            employee: data_employee,
            time: data_time,
        });
});
app.get('/admin', function (req, res, next) {
    res.render('admin');
});
app.get('/employee', function (req, res, next) {
    res.render('employee');
});
app.get('/appointment', function (req, res, next) {
    res.render('appointment', { appointment: data_appoint });
});
app.get('/feedback', function (req, res, next) {
    res.render('feedback', { feedback: data_feedback });
});
app.post('/saveAppointment', (req, res) => {
    let id = 1
    if (data_appoint.length > 0) {
        id = parseInt(data_appoint[data_appoint.length - 1]['id']) + 1;
    }
    let data = req.body;
    data['id'] = id
    data_appoint.push(data);
    fs.writeFileSync('./json/appoint.json', JSON.stringify(data_appoint));
    res.send({ status: 'success' });
});
app.post('/saveFeedback', (req, res) => {
    let id = 1
    if (data_feedback.length > 0) {
        id = parseInt(data_feedback[data_feedback.length - 1]['id']) + 1;
    }
    let data = req.body;
    data['id'] = id
    data_feedback.push(data);
    fs.writeFileSync('./json/feedback.json', JSON.stringify(data_feedback));
    res.send({ status: 'success' });
});

app.post('/login', (req, res) => {
    res.send({ status: 'success' });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const port = process.env.PORT || 3000;
const host = 'localhost';
app.listen(port, () => {
    console.log(`Server is running on port http://${host}:${port}`);
});
module.exports = app;
