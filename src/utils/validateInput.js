// validateInput.js

const validateQuizInput = (data) => {
  if (!data.title || !data.questions || !Array.isArray(data.questions)) {
    throw new Error('Invalid quiz input');
  }
  for (const question of data.questions) {
    if (!question.text || !Array.isArray(question.options) || typeof question.correct_option !== 'number') {
      throw new Error('Invalid question format');
    }
  }
};

module.exports = validateQuizInput;