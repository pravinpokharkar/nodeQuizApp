
const request = require('supertest');
const app = require('../src/app');

describe('Quiz API', () => {
  let createdQuizId;
  it('should create a quiz', async () => {
    const response = await request(app)
      .post('/quiz/create')
      .send({
        title: 'Math Quiz',
        questions: [
          { id: '1', text: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correct_option: 1 },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Math Quiz');
    createdQuizId = response.body.id;
  });

  it('should fetch the quiz', async () => {
    const response = await request(app).get(`/quiz/${createdQuizId}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Math Quiz');
  });

  it('should submit an answer', async () => {
    const response = await request(app)
      .post('/quiz/submit-answer')
      .send({ quizId: createdQuizId, questionId: '1', selectedOption: 1, userId:'user123' });

    expect(response.status).toBe(200);
    expect(response.body.is_correct).toBe(true);
  });

  it('should fetch results', async () => {
    const response = await request(app).get(`/quiz/results?quizId=${createdQuizId}&userId=user123`);
    expect(response.status).toBe(200);
  });
});