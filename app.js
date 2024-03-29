const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const lineMessageRouter = require('./routes/lineMessage');
const lineMiddleRouter = require('./routes/lineMiddle');
// const spotify = require("./controller/spotify");
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/apis/linemessage', lineMessageRouter);
app.use('/apis/lineMidRouter', lineMiddleRouter);
// app.get("/spotify", (req, res) => {
//     spotify.receivedAuthCode(req.query.code);
//     res.status(200).send("Login Successfully!");
// });

module.exports = app;
