
class Answer {
  constructor(questionId, selectedOption, isCorrect) {
    this.question_id = questionId;
    this.selected_option = selectedOption;
    this.is_correct = isCorrect;
  }
}

class Result {
  constructor(quizId, userId, score, answers) {
    this.quiz_id = quizId;
    this.user_id = userId;
    this.score = score;
    this.answers = answers;
  }
}

module.exports = { Answer, Result };