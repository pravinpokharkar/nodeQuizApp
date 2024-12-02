const express = require('express');
const quizRoutes = require('./routes/quiz.routes');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(express.json());
app.use('/quiz', quizRoutes);
app.use(errorHandler); // Use error handler middleware

module.exports = app;