const request = require('supertest');
const sinon = require('sinon');
const mongoose = require('mongoose');

const app = require('../../src/server').boostrapApp();
const VERSION = require('../../src/config').VERSION

const UserController = require('../../src/controllers/user');
const userMock = require('../mocks/user');

describe('User service test case', () => {
  let mongoStub = null;
  let getUserStub = null;
  let passwordStub = null;
  let token = null;

  beforeEach((done) => {
    getUserStub = sinon.stub(UserController, "getUserByUsername").callsFake(() => userMock);
    getAllStub = sinon.stub(UserController, "getAll").callsFake(() => [userMock]);
    passwordStub = sinon.stub(UserController, "checkIfPasswordMatch").callsFake(() => true);
    mongoStub = sinon.stub(mongoose, "connect").callsFake(() => {});
    request(app)
      .post(`/${VERSION}/auth/login`)
      .send({ username: "john", password: "test" })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  afterEach(() => {
    mongoStub.restore();
    getUserStub.restore();
    passwordStub.restore();
    getAllStub.restore();
  });


  it('Can not get all users without token', (done) => {
    request(app)
      .get(`/${VERSION}/users`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done)
  });

  it('Get all users', (done) => {
    request(app)
      .get(`/${VERSION}/users`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  it('Get a users', (done) => {
    request(app)
      .get(`/${VERSION}/users/username`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  it('User not found returns 404', (done) => {
    getUserStub.restore();
    getUserStub = sinon.stub(UserController, "getUserByUsername").callsFake(() => null);
    request(app)
      .get(`/${VERSION}/users/username`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done)
  });
});