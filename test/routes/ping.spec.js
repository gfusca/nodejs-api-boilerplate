const request = require('supertest');

const config = require('../../src/config');
const VERSION = config.VERSION;

describe('Ping service test case', function () {
  const app = require('../../src/server').boostrapApp();
  const agent = request.agent(app);

  it('should send ping message', function(done) {
    agent
    .get(`/${VERSION}/ping`)
    .expect('pong', done);
  });
})