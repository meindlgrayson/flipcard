const assert = require('assert');
const expressMock = require('supertest');
const application = require('../app.js');

describe('user', () => {
    it('should be able to register', (done) => {
      expressMock(application)
      .post('/register')
      .send({username: 'user', password: 'qwer1234'})
      .expect(200)
      .expect(response => {
        assert.deepEqual(response.body, {username: 'user', password: 'qwer1234',decks: []})
      })
      .end(done);
    });
  it('should be able to log in', (done) => {
    expressMock(application)
      .post('/login')
      .send({username: 'test-user', password: 'password'})
      .expect(200)
      .expect(response => {
        assert.deepEqual(response.body.status, 'success');
      })
      .end(done);
  });
  it('should be able to log out', (done) => {
    expressMock(application)
      .post('/logout')
      .send({username: 'test-user', password: 'password'})
      .expect(200)
      .expect(response => {
        assert.deepEqual(response.body.status, 'success');
      })
      .end(done);
  });
});

describe('deck', (done) => {
  it('should be able to be created by users', () => {
    expressMock(application)
      .post('/decks/create')
      .send({name: 'test-deck', cards: []})
      .expect(200)
      .expect(response => {
        console.log(response.body.status);
        assert.feepEqual(response.body.status, 'success');
      })
      .end(done);

  });
  it('should be able to be populated with flipcards', () => {

  });
  it('should be able to run though a quiz of contained flipcards displayed randomly', () => {

  });
});

describe('flipcard', () => {
  it('should be able to be created by users', () => {

  });
  it('should be able to be edited by users', () => {

  });
  it('should be able to be deleted by users', () => {

  });
  it('should be able to be marked correct or incorrect with data recorded', () => {

  });
});