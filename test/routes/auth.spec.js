const request = require('supertest');
const sinon = require('sinon');
const mongoose = require('mongoose');

const app = require('../../src/server').boostrapApp();
const VERSION = require('../../src/config').VERSION

const UserController = require('../../src/controllers/user');
const userMock = require('../mocks/user');
const registerMock = require('../mocks/register');

describe('Auth service test case', () => {
  
  let mongoStub = null;
  let getUserStub = null;
  let passwordStub = null;

  beforeEach(() => {
    getUserStub = sinon.stub(UserController, "getUserByUsername").callsFake(() => userMock);
    passwordStub = sinon.stub(UserController, "checkIfPasswordMatch").callsFake(() => true);
    mongoStub = sinon.stub(mongoose, "connect").callsFake(() => {});
  });

  afterEach(() => {
    mongoStub.restore();
    getUserStub.restore();
    passwordStub.restore();
  });

  it('Login successfully user and password', (done) => {
    request(app)
      .post(`/${VERSION}/auth/login`)
      .send({username: 'john', password: 'test'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });

  it('Can not login if user not exists', (done) => {
    getUserStub.restore();
    getUserStub = sinon.stub(UserController, "getUserByUsername").callsFake(() => null);
    request(app)
      .post(`/${VERSION}/auth/login`)
      .send({username: 'john', password: 'test'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });

  it('Can not login if password does not match', (done) => {
    passwordStub.restore();
    passwordStub = sinon.stub(UserController, "checkIfPasswordMatch").callsFake(() => false);
    request(app)
      .post(`/${VERSION}/auth/login`)
      .send({username: 'john', password: 'test'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done);
  });


  it('Register successfully with user', (done) => {
    getUserStub.restore();
    getUserStub = sinon.stub(UserController, "getUserByUsername").callsFake(() => null);
    const createUserStub = sinon.stub(UserController, "createUser").callsFake(() => userMock);
    request(app)
      .post(`/${VERSION}/auth/register`)
      .send(registerMock)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done)
  });

  it('Can not register with empty fields', (done) => {
    request(app)
      .post(`/${VERSION}/auth/register`)
      .send({username: 'test'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done)
  });

  it('Can not register if user exists', (done) => {
    request(app)
      .post(`/${VERSION}/auth/register`)
      .send({username: 'test'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done)
  });
});