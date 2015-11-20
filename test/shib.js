var chai  = require('chai');
var spies = require('chai-spies');
var shib  = require('..');

chai.use(spies);

var expect = chai.expect;

describe('Shibboleth middleware', function () {
  describe('init', function () {
    var req, res, next;

    beforeEach(function () {
      req = {
        headers: {
          http_shib_display_name: 'Test Name',
          http_shib_ep_emailaddress: '',
          http_shib_username: '',
          http_shib_student_number: '',
        }
      };
      res = {};
      next = chai.spy();
    });

    it('should function as middleware', function () {
      shib()(req, res, next);

      expect(next).to.have.been.called();
    });

    it('should inject development shib vars into request', function () {
      shib()(req, res, next);

      expect(req.shib.name).to.equal('Local Developer');
    });

    it('should inject production shib vars into request', function () {
      shib('production')(req, res, next);

      expect(next).to.have.been.called();
      expect(req.shib.name).to.equal('Test Name');
    });
  });

  describe('authenticate', function () {
    var req, res, next;

    beforeEach(function () {
      req = {
        path: '',
        shib: {}
      };
      res = {
        status: chai.spy(() => res),
        json: chai.spy(() => res)
      };
      next = chai.spy();
    });

    it('should ignore requests to shib_session', function () {
      req.path = '/shib_session';

      shib.authenticate(req, res, next);

      expect(next).to.have.been.called();
    });

    it('should do nothing if authenticated', function () {
      shib()(req, res, next);

      expect(next).to.have.been.called();
      next.reset();

      shib.authenticate(req, res, next);

      expect(next).to.have.been.called();

    });

    it('should create error response if not authenticated', function () {
      shib.authenticate(req, res, next);

      expect(res.status).to.have.been.called.with(401);
      expect(res.json).to.have.been.called.with({errors: [{
        status: 401,
        title: 'You are not authenticated'
      }]});
      expect(next).to.not.have.been.called();
    });
  });
});
