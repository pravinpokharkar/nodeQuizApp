
class Question {
  constructor(id, text, options, correctOption) {
    this.id = id;
    this.text = text;
    this.options = options;
    this.correctOption = correctOption;
  }
}

class Quiz {
  constructor(id, title, questions) {
    this.id = id;
    this.title = title;
    this.questions = questions;
  }
}

module.exports = { Question, Quiz };