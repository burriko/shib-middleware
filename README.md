# shib-middleware

[![Build Status](https://travis-ci.org/graemetait/shib-middleware.svg?branch=master)](https://travis-ci.org/graemetait/shib-middleware)
[![Coverage Status](https://coveralls.io/repos/github/graemetait/shib-middleware/badge.svg?branch=master)](https://coveralls.io/github/graemetait/shib-middleware?branch=master)

Express middleware to work with shibboleth headers.

- Reads shib headers and add them to req object.
- Authentication middleware to respond with 401 if user not authenticated.
- Provides route to respond with the shib session data.

## Install

```bash
$ npm install shib-middleware
```

## Usage
To set up shib data on the request object use the shib middleware.
```
app.use(shib());
```
By default shib data is read from live headers. You can pass in an object of your own vars for dev purposes.
```
app.use(shib({
  name:     'Local Developer',
  email:    'example@ncl.ac.uk',
  username: 'nxx99'
}));
```
To check if user is authenticated use shib.authenticate.
```
app.use(shib.authenticate);
```
To add a route that provides shib session data use sessionResponse.
```
app.get('/shib_session', shib.sessionResponse);
```
