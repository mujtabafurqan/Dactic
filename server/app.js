const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
// const path = require('path');
// const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const { resolve } = require('path');
const passport = require('passport');
const flash = require('express-flash');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { googleStrategy, linkedInStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const setup = require('./middlewares/frontendMiddleware');

const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const session = require('express-session');
const User = require('./models/user.model');
const cookieSession = require('cookie-session');
const app = express();
const router = express.Router();

// app.use(express.static(path.join(__dirname, 'build')));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
// app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// app.use(
//   session({
//     secret: '657376uhsadjbsjkfb6',
//     name: 'appCookie',
//   }),
// );
// jwt authentication
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// authentication
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['dsbvlhdbvhasbdhjb'],
  }),
);
app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log('DESERIALIZE', id);
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('google', googleStrategy);
passport.use(linkedInStrategy);

app.use(flash());

// app.use((req, res, next) => {
//   // After successful login, redirect back to the intended page
//   if (
//     !req.user &&
//     req.path !== '/login' &&
//     req.path !== '/signup' &&
//     !req.path.match(/^\/auth/) &&
//     !req.path.match(/\./)
//   ) {
//     req.session.returnTo = req.originalUrl;
//   } else if (
//     req.user &&
//     (req.path === '/account' || req.path.match(/^\/api/))
//   ) {
//     req.session.returnTo = req.originalUrl;
//   }
//   next();
// });

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
