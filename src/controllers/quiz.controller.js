// quiz.controller.js

const quizService = require('../services/quiz.service');

const createQuiz = async (req, res, next) => {
  try {
    const quiz = await quizService.createQuiz(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    next(error)
  }
};

const getQuiz = async (req, res, next) => {
  try {
    const quiz = await quizService.getQuiz(req.params.id);
    if (!quiz) {
      const error = new Error('Quiz not found');
      error.status = 404;
      throw error; // Throw an error
    }
    res.json(quiz);
  } catch (error) {
    next(error);
  }
};

const submitAnswer = async (req, res, next) => {
  try {
    const feedback = await quizService.submitAnswer(req.body);
    res.json(feedback);
  } catch (error) {
    next(error)
  }
};

const getResults = async (req, res, next) => {
  try {
    const { quizId, userId } = req.query;
    const results = await quizService.getResults(quizId, userId);
    if (!results) {
      const error = new Error('Results not found');
      error.status = 404;
      throw error; // Throw an error
    }
    if (!results) return res.status(404).json({ error: 'Results not found' });
    res.json(results);
  } catch (error) {
    next(error);
  }
};


module.exports = { createQuiz, getQuiz, submitAnswer, getResults };