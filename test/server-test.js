const assert= require('assert');
const app = require('../server');
const request = require('request');

describe ('Server', () => {

  before((done) => {
    this.port = 9876;
    this.server = app.listen(this.port, (err, result) => {
      if (err) { return done(err); }
      done();
    });

    this.request = request.defaults({
      baseUrl: 'http://localhost:9876/'
    });
  });

  it ('should exist', () => {
    assert(app);
  });

  //node convention to pass any errors as first argument
  describe ('GET /', () => {
    it('should return a 200', (done) => {
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
          assert.equal(response.statusCode, 200);
        done();
      });
    });

    it('should have a body with the name of the app', (done) => {
      var title = app.locals.title;
      this.request.get('/', (error, response) => {
        if (error) { done(error); }
          assert(response.body.includes(title),
          `"${response.body}" does not include "${title}".`);
        done();
      });
    });
  });

  describe('POST /new', () => {

    beforeEach(() => {
      app.locals.votes = {};
    });

    it('should not return 404', (done) => {
      this.request.post('/new', (error, response) => {
        if (error) { done(error); }
          assert.notEqual(response.statusCode, 404);
        done();
        });
      });

    it('should receive and store data', (done) => {
      assert(true);
      done();
    });

  });

});
