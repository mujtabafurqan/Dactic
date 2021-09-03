/* eslint-disable consistent-return */
/* eslint-disable indent */
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');
const app = require('./app');
const argv = require('./argv');
const port = require('./port');
const config = require('./config/config');
const logger = require('./config/logger');
const newlogger = require('./logger');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? // eslint-disable-next-line import/order
      require('ngrok')
    : false;

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

let server;
// server = app.listen(config.port, () => {
//   logger.info(`Listening to port ${config.port}`);
// });

// Start your app.
// eslint-disable-next-line prefer-const
server = app.listen(port, host, async err => {
  if (err) {
    return newlogger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return newlogger.error(e);
    }
    newlogger.appStarted(port, prettyHost, url);
  } else {
    // local dev is here
    newlogger.appStarted(port, prettyHost);
  }
});
// const options = {
//   key: fs.readFileSync('/etc/letsencrypt/live/dactic.io/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/dactic.io/cert.pem'),
//   ca: fs.readFileSync('/etc/letsencrypt/live/dactic.io/chain.pem'),
// };

// server = https
//   .createServer(options, (req, res) => {
//     res.writeHead(200);
//   })
//   .listen(port);
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB', config.mongoose.url);
  server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = error => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
