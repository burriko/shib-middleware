module.exports = init;
module.exports.authenticate = authenticate;
module.exports.sessionResponse = sessionResponse;

function init(shib_vars) {
  return function (req, res, next) {
    if (shib_vars) {
      req.shib = shib_vars;
    } else {
      req.shib = {
        name:           req.headers.http_shib_display_name,
        email:          req.headers.http_shib_ep_emailaddress,
        username:       req.headers.http_shib_username,
        student_number: req.headers.http_shib_student_number,
      };
    }
    next();
  }
}

function authenticate(req, res, next) {
  if (req.path == '/shib_session') return next();

  if (!req.shib.username) {
    var error_response = {
      status: 401,
      title: 'You are not authenticated'
    };
    res.status(401).json({errors: [error_response]});
    return;
  }
  next();
}

function sessionResponse(req, res) {
  if (req.shib.username) {
    res.json(req.shib);
  } else {
    var error_response = {
      status: 404,
      title: 'No session found'
    };
    res.status(404).json({errors: [error_response]});
  }
}
