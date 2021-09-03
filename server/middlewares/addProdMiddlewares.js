const path = require('path');
const express = require('express');
const compression = require('compression');
const fs = require('fs');

module.exports = function addProdMiddlewares(app, options) {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'build');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath));

  app.get('*', (req, res, next) => {
    console.log('reaches here', req.originalUrl.includes('v1/'));
    if (req.originalUrl.includes('v1/')) {
      next();
    } else {
      fs.readFile(path.join(outputPath, 'index.html'), (err, file) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.send(file.toString());
        }
      });
    }
  });
};
