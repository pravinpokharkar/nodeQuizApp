// quiz.routes.js

const express = require('express');
const { createQuiz, getQuiz, submitAnswer, getResults } = require('../controllers/quiz.controller');

const router = express.Router();

router.get('/results', getResults);
router.post('/create', createQuiz);
router.get('/:id', getQuiz);
router.post('/submit-answer', submitAnswer);



module.exports = router;