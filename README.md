# shib-middleware

[![Build Status](https://travis-ci.org/burriko/shib-middleware.svg?branch=master)](https://travis-ci.org/burriko/shib-middleware)

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
By default development data is used. To read live headers pass in the string 'production', or use an env var.
```
app.use(shib(app.get('env')));
```
To check if user is authenticated use shib.authenticate.
```
app.use(shib.authenticate);
```
To add a route that provides shib session data use sessionResponse.
```
app.get('/shib_session', shib.sessionResponse);
```