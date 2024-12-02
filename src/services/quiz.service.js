

const { Quiz, Question } = require('../models/quiz.model');
const { Result, Answer } = require('../models/result.model');

let allQuizes = []; // In Memory Data -ALL Quizes
let results = [];  // after user submit data, answers stored here


const quizService = {

  /**
   * Create Quiz
   * @param {*} data 
   * @returns { "id": "", "title": "","questions": []}
   */
  createQuiz: (data) => { 
      const questions = data.questions.map(q => new Question(q.id, q.text, q.options, q.correct_option));
      const newQuiz = new Quiz(Date.now().toString(), data.title, questions);
      allQuizes.push(newQuiz);
      return newQuiz;
  },



  /**
   * get quiz for specified ID
   * @param {*} id 
   * @returns 
   */
  getQuiz:  (id) => {
      const quiz = allQuizes.find(q => q.id === id);
      if (!quiz) return null;
  
      // Exclude correct_option in response
      return {
        ...quiz,
        questions: quiz.questions.map(({ id, text, options }) => ({ id, text, options })),
      };
   
  },



  /**
   * Submit answer for particular Quiz
   * @param {*} param { quizId, questionId, selectedOption, userId }
   * @returns 
   * {
    "is_correct": Boolean,
    "correct_option": Number
}
   */
  submitAnswer: ({ quizId, questionId, selectedOption, userId }) => {
   
    const quiz = (allQuizes || []).find(q => q.id === quizId);
    if (!quiz) throw new Error('Question not found');

    const question = quiz.questions.find(q => q.id === questionId);
    if (!question) throw new Error('Question not found');

    const isCorrect = question.correctOption === selectedOption;

    // Record the answer
    let result = results.find(r => r.quiz_id === quizId && r.user_id === userId);
    if (!result) {
      result = new Result(quizId, userId, 0, []);
      results.push(result);
    }

    result.answers.push(new Answer(questionId, selectedOption, isCorrect));
    if (isCorrect) result.score++;

    return { is_correct: isCorrect, correct_option: question.correctOption };
  },


/**
 * Get Result of USER for particular Quiz
 * @param {*} quizId 
 * @param {*} userId 
 * @returns 
 */
  getResults: (quizId, userId) => {
    return results.find(r => r.quiz_id === quizId && r.user_id === userId) || null;
  },
}; 


module.exports = quizService;